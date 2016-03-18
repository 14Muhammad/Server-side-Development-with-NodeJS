var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Verify = require('./verify');
var Leaders = require('./../models/leadership')

var leadersRouter = express.Router()

leadersRouter.use(bodyParser.json())

/* Route '/' */

leadersRouter
  .route('/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.find({}, function (err, leaders) {
      assert.equal(err, null)
      res.json(leaders)
    })
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
      assert.equal(err, null)
      res.json(leader)
    })
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaders.remove({}, function (err, leaders) {
      assert.equal(err, null)
      res.json(leaders)
    })
  })

/* Route '/:leaderId' */

leadersRouter
  .route('/:leaderId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.findById(req.params.leaderId, function (err, leader) {
      assert.equal(err, null)
      res.json(leader)
    })
  })

  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    console.log(req.body)
    Leaders.findByIdAndUpdate(req.params.leaderId, req.body, function (err, leader) {
      assert.equal(err, null)
      res.json(leader)
    })
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, leader) {
      assert.equal(err, null)
      res.json(leader)
    })
  })

module.exports = leadersRouter
