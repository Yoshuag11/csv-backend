"use strict";

require("core-js/modules/es.promise");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formidable = require('formidable');

const csvtojson = require('csvtojson'); // const express = require( 'express' );


const csv = require('csv');

const {
  Client
} = require('pg'); // const bodyParser = require( 'body-parser' );


const app = (0, _express.default)();
const port = 3001;
const dbTable = 'data';
const client = new Client({
  user: 'postgres',
  password: 'postgres',
  database: 'mydb'
}); // client.connect()
// 	.then( () => {

/**
 * Middleware setup
 */

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.get('/', function (req, res) {
  res.send(`API is working!`);
});
app.get('/query', async function (req, res) {
  // const { query, criteria, offset = 0, limit = 50 } = req.query;
  const {
    query,
    criteria,
    offset = 0,
    limit
  } = req.query;
  const queryString = `SELECT * FROM ${dbTable}
					WHERE ${criteria} = '${query}'
					${limit ? `OFFSET ${offset} LIMIT ${limit}` : ''} `; // OFFSET ${ offset} LIMIT ${ limit }`;

  const response = await client.query(queryString);
  const {
    rowCount,
    rows
  } = response;
  res.send({
    rowCount,
    rows
  });
});
app.put('/files', function (req, res) {
  new formidable.IncomingForm().parse(req).on('file', async function (name, file) {
    let keys = []; // console.log( 'Uploaded file!', 'name:', name, 'file:', file );
    // console.log( 'file.path', file.path );
    // const jsonData = await csvtojson().fromFile( file );

    try {
      const jsonData = await csvtojson().fromFile(file.path);

      if (jsonData.length > 0) {
        keys = Object.keys(jsonData[0]);
        const values = jsonData.map(function (data) {
          return `'${data.Type}', '${data.Direction}', '${data.From}',
									'${data.To}', '${data.Extension}',
									'${data['Forwarded To']}', '${data.Name}',
									'${data.Date.split(' ')[1]}', '${data.Time}',
									'${data.Action}', '${data['Action Result']}',
									'${data['Result Description']}', '${data.Duration}',
									'${data.Included}', '${data.Purchased}'`;
        });
        const query = `INSERT INTO ${dbTable}(
									type, direction, "from", "to", extension, "forwarded to",
									name, date, time, action, "action result",
									"result description", duration, included, purchased
								) VALUES ( ${values.join(' ), ( ')} );`;
        await client.query(query);
        res.send({
          keys
        });
      }
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
app.listen(port, function () {
  return console.log(`App is listening on port ${port}`);
}); // } )
// .catch( error => console.log( error ) );