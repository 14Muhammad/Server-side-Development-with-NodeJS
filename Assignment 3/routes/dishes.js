var express = require('express')
var bodyParser = require('body-parser')
var assert = require('assert')

var Verify = require('./verify')
var Dishes = require('./../models/dishes')

var dishRouter = express.Router()

dishRouter.use(bodyParser.json())

/* Route '/' */

dishRouter
  .route('/')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.find({}, function (err, dishes) {
      assert.equal(err, null)
      res.json(dishes)
    })
  })

  .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.create(req.body, function (err, dish) {
      assert.equal(err, null)
      res.json(dish)
    })
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.remove({}, function (err, dishes) {
      assert.equal(err, null)
      res.json(dishes)
    })
  })

/* Route '/:dishId' */

dishRouter
  .route('/:dishId')
  // .all(function (req, res, next) {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   })
  //   next()
  // })

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
      assert.equal(err, null)
      res.json(dish)
    })
  })

  .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    console.log(req.body)
    Dishes.findByIdAndUpdate(req.params.dishId, req.body, function (err, dish) {
      assert.equal(err, null)
      res.json(dish)
    })
  })

  .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findByIdAndRemove(req.params.dishId, function (err, dish) {
      assert.equal(err, null)
      res.json(dish)
    })
  })

module.exports = dishRouter
