const express = require('express')
const board = require('../db/board')()

const router = express.Router();

//board를 db에 등록하고 저장된 정보를 json으로 response
router.post('', function(req, res) {
  console.log(req.body);
  board.write(req.body, function(err, result) {
    board.show(result.insertId, function(showErr, data) {
      res.status(201).json(data[0]);
    })
  });
})

module.exports = router;
