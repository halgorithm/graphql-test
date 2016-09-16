const db = require('./db');
const schema = require('./setup-graphql-schema');
const root = require('./setup-graphql-resolvers');

const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

app.use('/', express.static(__dirname + '/client'));

// graphql-express integration
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080, '0.0.0.0', () => {
  console.log("Hey it started!");
});
