const schema = require('./api/schema');
const resolvers = require('./api/resolvers');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');

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
  console.log("Hey it started!");
});
