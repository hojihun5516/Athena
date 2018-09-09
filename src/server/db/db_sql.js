const
  pool = require('./db_connect');

module.exports = function() {
  return {
    checkSameUser: function(providerId, callback) {
      pool.getConnection(function(error, con) {
        console.log(error);
        let sql = 'select * from user where provider_id = ?';
        con.query(sql, providerId, function(err, result, fields) {
          con.release();
          if (err) {
            return callback(err)
          };
          callback(null, result);
        });
      });
    },
    pool: pool
  }
};
