const schema = require('./api/schema');
const resolvers = require('./api/resolvers');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');
// graphql subscription stuff
import { createServer } from 'http';
import { SubscriptionServer as WSServer } from 'subscriptions-transport-ws';
import { subscriptionManager } from './api/subscription-manager';

// Setup websocket server for graphql subscriptions
const WS_PORT = 4000;
const httpServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
httpServer.listen(WS_PORT, () => {
  console.log(`WebSocket server is now running on ws://localhost:${WS_PORT}`)
});
const wsServer = new WSServer({ subscriptionManager: subscriptionManager }, httpServer);

const app = express();
app.use('/', express.static(__dirname + '/../client/public'));

// graphql-express integration
app.use('/graphql',
  (req, res, next) => {
    req.userId = '0';
    next();
  },
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(8080, '0.0.0.0', () => {
  console.log(`HTTP server is now running on http://localhost:8080`);
});
