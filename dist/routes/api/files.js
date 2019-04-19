"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

var _formidable = _interopRequireDefault(require("formidable"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _db = _interopRequireDefault(require("../../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();
exports.route = route;
route.put('/', function (req, res) {
  new _formidable.default.IncomingForm().parse(req).on('file', async function (name, file) {
    try {
      const jsonData = await (0, _csvtojson.default)().fromFile(file.path);
      const keys = await _db.default.setData(jsonData);
      res.send({
        keys
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: 'file could not be uploaded'
      });
    }
  }).on('error', function (err) {
    res.status(400).send({
      message: 'file could not be uploaded'
    });
  });
});