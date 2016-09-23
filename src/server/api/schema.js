const graphQL = require('graphql');

const schema = graphQL.buildSchema(`
  type Subscription {
    # Get the upvote count for a post?
    # upvotes(id: ID!): Int!
    # Get a Post subscription?
    post(id: ID!): Post!
    # Get a Post's Comments?
    # comments(id: ID!): [Comment!]!
  }

  type Query {
    # Get a Post by ID
    post(id: ID!): Post!

    # Get all Posts for a subreddit (TODO figure out arguments for scoping/pagination bullshitz)
    posts: [Post!]!

    # Get the authenticated User
    me: User!

    # Get a User by ID
    user(id: ID!): User!

    # Get all Users
    users: [User!]!
  }

  type Mutation {
    # Make a text Post
    makeTextPost(title: String!, content: String!): Post!

    # Make a link Post
    makeLinkPost(title: String! link: String!): Post!

    # Update a Post
    updatePost(id: ID!, content: String!): Post!

    # Delete a Post
    deletePost(id: ID!): Post!

    # Follow a User by their id
    # Returns the user that was followed
    followUser(id: ID!): User!

    # Stop following a User by their id
    unfollowUser(id: ID!): User!

    # Upvote a post
    upvote(id: ID!): Post!
  }

  # A user of the website who can author posts and follow other users.
  type User {
    id: ID!
    username: String!
    posts: [Post!]!
    following: [User!]!
    accessToken: String!
  }

  # A post, which can be either a link post or a text post.
  type Post {
    id: ID!
    author: User!
    title: String!
    link: String
    content: String
    upvotes: Int!
  }
`);

module.exports = schema;
