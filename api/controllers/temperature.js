"use strict";
var util = require("util");
var mongodb = require("../helpers/mongodb.js");
const collection = "temperature";

module.exports = {
  getTemperature: getTemperature
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getTemperature(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

  mongodb.getCollection(function(rep) {
    // this sends back a JSON response which is a single string
    console.log(rep[0].date);
    res.json(rep);
  }, collection);
}
