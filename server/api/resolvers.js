const db = require('../db');
const uuid = require('node-uuid');
const _ = require('lodash');

const resolvers = {
  me(args, req) {
    return db.get(`users.${req.userId}`).value();
  },

  makeTextPost(args, req) {
    const defaults = {authorId: req.userId, link: null, upvotes: 0};
    const attrs = {id: uuid.v4(), title: args.title, content: args.content};
    attrs = _.defaults(attrs, defaults);

    db.set(`posts.${attrs.id}`, attrs).value();
    return attrs;
  },

  makeLinkPost(args, req) {
    const defaults = {authorId: req.userId, content: null, upvotes: 0};
    const attrs = {id: uuid.v4(), title: args.title, link: args.link};
    attrs = _.defaults(attrs, defaults);

    db.set(`posts.${attrs.id}`, attrs).value();
    return attrs;
  },

  deletePost(args, req) {
    // TODO disallow deleting an already-deleted post
    const post = db.get(`posts.${args.id}`).value();
    db.unset(`posts.${args.id}`).value();

    return post;
  },

  updatePost(args, req) {
    // TODO disallow updates to already-deleted posts
    // TODO disallow updates to link posts
    const post = db.get(`posts.${args.id}`).assign({content: args.content}).value();

    return post;
  },

  followUser(args, req) {
    // TODO disallow following an invalid user id
    // TODO disallow following a banned user id
    console.log(req.userId);
    const myFollowing = db.get(`users.${req.userId}.following`).value();
    const user = db.get(`users.${args.id}`).value();

    if (!_.includes(myFollowing, args.id)) {
      db.set(`users.${req.userId}.following.${myFollowing.length}`, args.id).value();
    }

    return user;
  },

  posts(args, req) {
    return db.get('posts').values().value();
  },

  post(args, req) {
    return db.get(`posts.${args.id}`).value();
  },

  userPosts(args, req) {
    return db.get('posts').filter({'authorId': args.id}).value();
  }
};

module.exports = resolvers;
