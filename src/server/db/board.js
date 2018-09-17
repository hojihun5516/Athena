const pool = require('./db_connect');

module.exports = function() {
  return {
    findByGroupId: function(groupId, callback) {
      pool.getConnection(function(err, con) {
        if (err) {
          return callback(err)
        };
        let sql = 'SELECT id, title, contents FROM board WHERE group_id = ?';
        con.query(sql, groupId, function(error, result, fields) {
          con.release();
          if (error) {
            return callback(error)
          };
          console.log('success show');
          callback(null, result);
        })
      })
    },
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
    write: function(board, groupId, callback) {
      pool.getConnection(function(err, con) {
        console.log(`board write error : ${err}`);
        let sql = 'INSERT INTO board (title, contents, group_id) VALUES (?, ?, ?)';
        con.query(sql, [board.title, board.contents, groupId], function(error, rows, fields) {
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
