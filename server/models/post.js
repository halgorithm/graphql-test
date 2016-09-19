const _ = require('lodash');
const db = require('../db');

class Post {
  constructor(attrs = {}) {
    attrs = _.defaults(attrs, Post.defaultattrs);
    this.id = attrs.id;
    this.authorId = attrs.authorId;
    this.title = attrs.title;
    this.content = attrs.content;
    this.link = attrs.link;
    this.upvoteCount = attrs.upvotes;
  }

  author(args, context) {
    const attrs = db.get(`users.${this.authorId}`).value();
    return new User(attrs);
  }

  upvotes(args, context) {
    // return db.get('upvotes').filter({postId: this.id}).value().length;
    return this.upvoteCount; // TODO return count of Upvote records associated with this post
  }
}

Post.defaultParams = {
  content: null,
};

module.exports = Post;
const User = require('./user');
