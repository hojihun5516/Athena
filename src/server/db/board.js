const pool = require('./db_connect');

module.exports = function() {
  return {
    write: function(data, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board write error : ${err}`);
        let sql = 'INSERT INTO board (title, contents) VALUES (?, ?)';
        con.query(sql, [data.title, data.contents], function(err, rows, fields) {
          con.release();
          if (err) {
            return callback(err)
          };
          console.log(`id : ${rows.insertId}`);
          callback(null, rows);
        });
      });
    },
    show: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board show error : ${err}`);
        let sql = 'SELECT id, title, contents FROM board WHERE id = ?';
        con.query(sql, boardId, function(err, result, fields) {
          con.release();
          if (err) {
            return callback(err)
          };
          console.log('success show');
          callback(null, result);
        });
      });
    }
  }
}
