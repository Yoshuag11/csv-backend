"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = void 0;

var _express = require("express");

var _db = _interopRequireDefault(require("../../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _express.Router)();
exports.route = route;
route.get('/', async function (req, res) {
  const {
    query,
    criteria,
    offset = 0,
    limit
  } = req.query;

  try {
    const response = await _db.default.getFiltered({
      criteria,
      query,
      limit,
      offset
    });
    const {
      rowCount,
      rows
    } = response;
    res.send({
      rowCount,
      rows
    });
  } catch (err) {
    res.status(500).json({
      error: `${err}`
    });
  }
});