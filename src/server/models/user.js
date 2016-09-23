const _ = require('lodash');
const db = require('../db');

class User {
  constructor(attrs = {}) {
    attrs = _.defaults(attrs, User.defaultattrs);
    this.id = attrs.id;
    this.username = attrs.username;
    this.following = attrs.following;
    this.accessToken = attrs.accessToken;
  }

  posts(args, context) {
    // TODO use args for pagination
    return db.get('posts').values().filter({authorId: this.id}).map((attrs) => {
      return new Post(attrs);
    }).value();
  }
}

User.defaultParams = {
  following: [],
};

module.exports = User;
const Post = require('./post');
