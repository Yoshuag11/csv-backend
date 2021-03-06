"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFiltered = getFiltered;
exports.setData = setData;
const db = {
  keys: [],
  data: []
};
/**
 * Query data from the uploaded file stored in memory
 * @param {Object} options 
 * @param {string} options.criteria
 * @param {string} options.query
 * @param {number} options.offset
 * @param {number} options.limit
 */

function getFiltered(options) {
  return Promise.resolve({
    rowCount: db.data.length,
    rows: db.data
  });
}
/**
 * Insert daily report into Memory
 * @param {string[]} jsonData data to save
 */


async function setData(jsonData = [{}]) {
  db.keys = Object.keys(jsonData[0]);
  db.data = jsonData;
  console.log('setData: ', db.data.length);
  return Promise.resolve(db.keys);
}