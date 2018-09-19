const express = require('express')
const group = require('../db/group')()
const board = require('../db/board')()

const router = express.Router();

router.post('', function(req, res) {
  console.log(`group : ${req.body}`);
  group.make(req.body, function(err, result) {
    group.show(result.insertId, function(showErr, data) {
      res.status(201).json(data[0]);
    })
  });
})

router.get('', function(req, res) {
  group.findAll(function(err, result) {
    res.status(200).json({
      groups: result
    });
  })
})

router.post('/:groupId/boards', function(req, res) {
  console.log(`board : ${req.body}`);
  console.log(req.params.groupId);
  board.write(req.body, req.params.groupId, function(err, result) {
    board.show(result.insertId, function(showErr, data) {
      res.status(201).json(data[0]);
    })
  });
})

router.get('/:groupId/boards', function(req, res) {
  console.log(req.params.groupId);
  board.findByGroupId(req.params.groupId, function(err, data) {
<<<<<<< HEAD
    res.status(200).json({
      boards: data
    });
=======
  res.status(200).json({ boards: data });
>>>>>>> 0ea2d66c23d666a3189fceb5329addd22c6982df
  })
})

module.exports = router;
