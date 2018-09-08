const
  pool = require('./db_connect');

module.exports = function () {
  return {
    checkSameUser: function(provider_id, callback) {
      pool.getConnection(function(err, con) {
        console.log(err);
        let sql = 'select * from user where provider_id =' + provider_id;
        con.query(sql, function (err, result, fields) {
          con.release();
          if (err) return callback(err);
          callback(null, result);
        });
      });
    },
    pool: pool
    // insert: function(callback) {
    //   pool.getConnection(function(err, connection) {
    //     let sql =
    //   })
    // }
  }
};
