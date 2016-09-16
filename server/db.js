var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE todos (id TEXT, description TEXT, completed BOOLEAN)");

  var stmt = db.prepare("INSERT INTO todos (id, description, completed) VALUES (?, ?, ?)");
  for (var i = 0; i < 10; i++) {
      stmt.run(i.toString(), `Ipsum ${i}`, false);
  }
  stmt.finalize();

  db.each("SELECT id, description, completed FROM todos", function(err, row) {
      console.log([row.id, row.description, row.completed]);
  });
});

//db.close(); // close is for fucknobs aannehghnhh

module.exports = db;
