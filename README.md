# note 📔
Apollo Client 2.0 with WebSocket Example, Initial project by [create-react-app](https://github.com/facebookincubator/create-react-app)

## Example on
[🎉 Setup Apollo 2.0 with Websocket](https://medium.com/@SunCerberus/setup-apollo-client-2-0-with-websocket-example-a879ca81aa83)

[✏️ Automatic Type definition with apollo-codegen ](https://medium.com/@SunCerberus/automatic-type-definition-with-apollo-codegen-example-%EF%B8%8F-87e586a1bac8)

![note-app](https://user-images.githubusercontent.com/9087409/39082833-a7a727c2-4583-11e8-8139-35d454c2f1ba.gif)

### Endpoints Setup [![graphql-up](http://static.graph.cool/images/graphql-up.svg)](https://www.graph.cool/graphql-up/new?source=https://github.com/Cerberus/note/blob/master/note.graphql)
```
yarn global add graphql-up

graphql-up note.graphql
```

After endpoint was created, you will receive this message:
```
  ✔  Your GraphQL API is ready to use. Here are your endpoints:

    ❯ Simple API: https://api.graph.cool/simple/v1/__alias__
    ❯ Relay API:  https://api.graph.cool/relay/v1/__alias__
    ❯ Subscriptions API: wss://subscriptions.graph.cool/v1/__alias__

  Open your GraphQL endpoint in a browser to use the interactive API Playground.

  API Documentation: https://www.graph.cool/docs/graphql-up/
```
Create env file
```
yarn env
```
Set Simple API & Subscriptions API to .env file
```
NODE_PATH=src/
REACT_APP_API_URL="https://api.graph.cool/simple/v1/__alias__"
REACT_APP_WEB_SOCKET_URL="wss://subscriptions.graph.cool/v1/__alias__"
```

### Installation
```
yarn
```

### Run server
```
yarn start
```

### Playground
Open `Simple API` link on the browser to access Playground
![playground](https://user-images.githubusercontent.com/9087409/30781573-ad4ff7b2-a14b-11e7-85d2-73c4f023adcd.png)


### Update query document (src/schema/gen.json)
```
yarn intro
```

### Generate all component's type-annotations
```
yarn gen
```
