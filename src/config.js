export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "sle-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://hev26m1t4m.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_pRJmWu9TB",
    APP_CLIENT_ID: "4tt4717peec6hpnb1kjqj3ni57",
    IDENTITY_POOL_ID: "us-east-1:4a53b874-2824-41ed-b965-81d2268f5c25"
  }
};
