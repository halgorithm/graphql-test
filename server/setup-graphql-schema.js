const graphQL = require('graphql');

const schema = graphQL.buildSchema(`
  type Query {
    todo(id: ID!): Todo!
    todos: [Todo]
  }

  type Mutation {
    createTodo(params: TodoInput): Todo!
    updateTodo(id: ID!, params: TodoInput!): Todo
    # updateTodos(ids: [ID!], params: TodoInput!): [Todo]
  }

  type User {
    id: ID!
  }

  type Todo {
    id: ID!
    # owner: User!
    description: String!
    completed: Boolean!
  }

  input TodoInput {
    description: String
    completed: Boolean
  }
`);

module.exports = schema;
