const express = require('express')
const group = require('../db/group')()

const router = express.Router();

router.post('', function(req, res) {
  console.log(`group : ${req.body}`);
  group.make(req.body, function(err, result) {
    group.show(result.insertId, function(showErr, data) {
      res.status(201).json(data[0]);
    })
  });
})

module.exports = router;
