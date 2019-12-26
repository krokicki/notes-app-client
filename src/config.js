export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-way5a22bh784"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://9e46pt5kuj.execute-api.us-east-1.amazonaws.com/dev",
    WSS_URL: "wss://eyikwn42j7.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_325xk7QE5",
    APP_CLIENT_ID: "7bv3ainjdjudnq6gji9i1ttkfh",
    IDENTITY_POOL_ID: "us-east-1:58bb55df-3c51-4757-84c5-992f0c18e481"
  }
};
