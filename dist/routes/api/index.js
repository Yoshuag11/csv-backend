"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

var _query = require("./query");

var _files = require("./files");

var _schema = require("./schema");

const route = (0, _express.Router)();
exports.route = route;
route.use('/query', _query.route);
route.use('/files', _files.route);
route.use('/schema', _schema.route);