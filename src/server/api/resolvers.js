const db = require('../db');
const uuid = require('node-uuid');
const _ = require('lodash');
const User = require('../models/user');
const Post = require('../models/post');
import {pubsub} from './subscription-manager';

const resolvers = {
  awesome(args, req) {
    return true;
  },

  me(args, req) {
    const attrs = db.get(`users.${req.userId}`).value();
    return new User(attrs);
  },

  makeTextPost(args, req) {
    const defaults = {authorId: req.userId, link: null, upvotes: 0};
    let attrs = {id: uuid.v4(), title: args.title, content: args.content};
    _.defaults(attrs, defaults);

    db.set(`posts.${attrs.id}`, attrs).value();
    return new Post(attrs);
  },

  makeLinkPost(args, req) {
    const defaults = {authorId: req.userId, content: null, upvotes: 0};
    let attrs = {id: uuid.v4(), title: args.title, link: args.link};
    _.defaults(attrs, defaults);

    db.set(`posts.${attrs.id}`, attrs).value();
    return new Post(attrs);
  },

  deletePost({id}, req) {
    // TODO disallow deleting an already-deleted post
    const attrs = db.get(`posts.${id}`).value();
    db.unset(`posts.${id}`).value();

    return new Post(attrs);
  },

  updatePost({id, content}, req) {
    // TODO disallow updates to already-deleted posts
    // TODO disallow updates to link posts
    const attrs = db.get(`posts.${id}`).assign({content}).value();
    const post = new Post(attrs);
    pubsub.publish('postChanged', post);

    return post;
  },

  followUser(args, req) {
    // TODO disallow following an invalid user id
    // TODO disallow following a banned user id
    const myFollowing = db.get(`users.${req.userId}.following`).value();
    const userAttrs = db.get(`users.${args.id}`).value();

    if (!_.includes(myFollowing, args.id)) {
      db.set(`users.${req.userId}.following.${myFollowing.length}`, args.id).value();
    }

    return new Post(userAttrs);
  },

  posts(args, req) {
    return db.get('posts').values().map(attrs => new Post(attrs)).value();
  },

  post(args, req) {
    return new Post(db.get(`posts.${args.id}`).value());
  },

  user(args, req) {
    const attrs = db.get(`users.${args.id}`).value();
    return new User(attrs);
  }
};

module.exports = resolvers;
