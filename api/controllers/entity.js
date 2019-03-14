"use strict";
var util = require("util");
var mongodb = require("../helpers/mongodb.js");
var ObjectId = require("mongodb").ObjectID;
var _ = require("lodash");

module.exports = {
  insertEntity: insertEntity,
  getEntity: getEntity,
  getEntityById: getEntityById
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

function getEntity(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}.value

  var entity = req.swagger.params.entity.value;

  mongodb.select(entity, {}, (err, result) => {
    if (err) res.status(400).json(err);

    res.status(200).json(result);
    return;
  });
}

function getEntityById(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}.value

  var entity = req.swagger.params.entity.value;
  var id = ObjectId(req.swagger.params.id.value);
  var query = { _id: id };

  mongodb.select(entity, query, (err, result) => {
    if (err) res.status(400).json(err);

    res.status(200).json(result);
    return;
  });
}

function insertEntity(req, res) {
  var entity = req.swagger.params.entity.value;
  var datas = req.body;
  var mergedDatas = _.merge(
    {
      _id: ObjectId()
    },
    datas
  );

  mongodb.insert(entity, mergedDatas, (err, result) => {
    if (err) res.status(400).json(err);
    res.status(200).json(result.insertedId);
    return;
  });
}
