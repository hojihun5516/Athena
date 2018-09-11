const pool = require('./db_connect');

module.exports = function() {
  return {
    show: function(boardId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board show error : ${err}`);
        let sql = 'SELECT id, title, contents FROM board WHERE id = ?';
        con.query(sql, boardId, function(error, result, fields) {
          con.release();
          if (error) {
            return callback(error)
          };
          console.log('success show');
          callback(null, result);
        });
      });
    },
    write: function(data, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board write error : ${err}`);
        let sql = 'INSERT INTO board (title, contents) VALUES (?, ?)';
        con.query(sql, [data.title, data.contents], function(error, rows, fields) {
          con.release();
          if (error) {
            return callback(error)
          };
          console.log(`id : ${rows.insertId}`);
          callback(null, rows);
        });
      });
    }
  }
}
