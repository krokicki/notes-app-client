import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { Auth } from "aws-amplify";
import "./App.css";
import Sockette from "sockette";
import config from './config';

let ws = null;

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const session = await Auth.currentSession();
      await connectWebSocket(session);
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  const processMessage = ({data}) => {
    console.log("Message Received:", data)
    const { eventType, noteId } = JSON.parse(data);
    console.log("  eventType:", eventType)
    console.log("  noteId:", noteId)
  }

  async function connectWebSocket(session) {

    let jwt = session.accessToken.jwtToken;

    //Init WebSockets with Cognito Access Token
    ws = new Sockette(
      config.apiGateway.WSS_URL+"?token="+jwt,
      {
        timeout: 5e3,
        maxAttempts: 1,
        onopen: e => console.log("Connected to WebSocket"),
        onmessage: e => processMessage(e),
        onreconnect: e => console.log("Reconnecting to WebSocket..."),
        onmaximum: e => console.log("Stop Attempting WebSocket connection."),
        onclose: e => console.log("Closed WebSocket"),
        onerror: e => console.log("Error from WebSocket:", e)
      }
    );

    console.log(ws);

    // ws.json({
    //   action: "sendMessage",
    //   data: "Hello World"
    // });

  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
              ? <NavItem onClick={handleLogout}>Logout</NavItem>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);