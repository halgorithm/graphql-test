const db = require('./db');
const uuid = require('node-uuid');
const _ = require('lodash');

const resolvers = {
  createTodo(args) {
    return new Promise((resolve, reject) => {
      const defaults = {description: "Untitled", completed: false};
      const params = args.params;
      const attrs = _.defaults(params, defaults);
      const id = uuid.v4();

      var stmt = db.prepare("INSERT INTO todos (id, description, completed) VALUES (?, ?, ?)");
      stmt.run(id, attrs.description, attrs.completed);
      stmt.finalize();

      // copy-pasted
      db.get(`SELECT * FROM todos WHERE todos.id = ? LIMIT 1`, [id], (err, todo) => {
        if (err) {
          throw err;
        }
        resolve(todo);
      });
    });
  },

  updateTodo(args) {
    const id = args.id;
    const params = args.params;
    return new Promise((resolve, reject) => {
      const pairs = _.toPairs(params); // [[desc, asdf], [completed, maybe]] => desc = ?,compl = ?
      const bananas = pairs.map(pair => pair[0] + ' = ?').join(',');
      const values = pairs.map(pair => pair[1]);
      values.push(id);
      db.run(`UPDATE todos SET ${bananas} WHERE id = ?`, values, (err, todo) => {
        if (err) {
          throw err;
        }
        db.get(`SELECT * FROM todos WHERE id = ? LIMIT 1`, [id], (err, todo) => {
          if (err) {
            throw err;
          }
          resolve(todo);
        });
      });
    });
  },

  todos() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM todos`, (err, todos) => {
        if (err) {
          reject(err);
        }
        resolve(todos);
      });
    });
  },

  todo(args) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM todos WHERE todos.id = ? LIMIT 1`, [args.id], (err, todo) => {
        if (err) {
          reject(err);
        }
        resolve(todo);
      });
    });
  }
};

module.exports = resolvers;
