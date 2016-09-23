const _ = require('lodash');
const low = require('lowdb');

const storePath = './data/db.json';
const db = low(storePath);

function seedDB() {
  db.defaults({posts: {}, users: {}}).value();

  // Users
  `
    0,turplepurtle,turple
    1,halgorithm,halgo
    2,MrLocus,locii
  `
  .trim()
  .split('\n')
  .forEach(row => {
    const fields = row.trim().split(',');
    db.get('users').set(fields[0], {
      id: fields[0],
      username: fields[1],
      following: [],
      accessToken: fields[2],
    }).value();
  });

  // Posts
  _.forEach([
    'http://example.com',
    'http://google.com',
    'http://ebay.com',
    'http://yahoo.com',
    'http://lemonparty.com',
    'http://corgiorgy.com',
    'http://facebook.com',
    'http://developer.mozilla.com',
  ], (url, i) => {
    const id = String(i);
    db.get('posts').set(id, {
      id: id,
      authorId: String(Math.min(Math.floor(i / 3),2)),
      title: 'Hey guys, come visit ' + url,
      link: url,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      upvotes: 256 * Math.random() | 0,
    }).value();
  });
}

if (!db.has('posts').value()) {
  console.log("Seeding DB...");
  seedDB(); // don't re-seed if already seeded
}

module.exports = db;

