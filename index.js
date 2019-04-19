const formidable = require( 'formidable' );
const csvtojson = require( 'csvtojson' );
const express = require( 'express' );
const csv = require( 'csv' );
const { Client } = require( 'pg' );
const bodyParser = require( 'body-parser' );
const app = express();
const port = 3001;
const dbTable = 'data';
const client = new Client( {
	user: 'postgres',
	password: 'postgres',
	database: 'mydb'
} );

client.connect()
	.then( () => {
		console.log( 'Database connection established' );

		app.use( bodyParser.urlencoded( { extended: false } ) );
		app.use( bodyParser.json() );
		app.get( '/', ( req, res ) => {
			res.send( `API is working!` );
		} );
		app.get( '/query', async ( req, res ) => {
			// const { query, criteria, offset = 0, limit = 50 } = req.query;
			const { query, criteria, offset = 0, limit } = req.query;
			const queryString =
				`SELECT * FROM ${ dbTable }
					WHERE ${ criteria } = '${ query }'
					${ limit ? `OFFSET ${ offset} LIMIT ${ limit }` : '' } `;
					// OFFSET ${ offset} LIMIT ${ limit }`;

			const response = await client.query( queryString );
			const { rowCount, rows } = response;

			res.send( { rowCount, rows } );
		} );
		app.put( '/files', ( req, res ) => {
			new formidable.IncomingForm().parse( req )
				.on( 'file', async ( name, file ) => {
					let keys = [];
					// console.log( 'Uploaded file!', 'name:', name, 'file:', file );
					// console.log( 'file.path', file.path );
					// const jsonData = await csvtojson().fromFile( file );

					try {
						const jsonData = await csvtojson().fromFile( file.path );
	
						if ( jsonData.length > 0 ) {
							keys = Object.keys( jsonData[ 0 ] );

							const values = jsonData.map( data => {
								return(
									`'${ data.Type }', '${ data.Direction }', '${ data.From }',
									'${ data.To }', '${ data.Extension }',
									'${ data[ 'Forwarded To' ] }', '${ data.Name }',
									'${ data.Date.split( ' ')[ 1 ] }', '${ data.Time }',
									'${ data.Action }', '${ data[ 'Action Result' ] }',
									'${ data[ 'Result Description' ] }', '${ data.Duration }',
									'${ data.Included }', '${ data.Purchased }'`
								);
							} );
							const query =
								`INSERT INTO ${ dbTable }(
									type, direction, "from", "to", extension, "forwarded to",
									name, date, time, action, "action result",
									"result description", duration, included, purchased
								) VALUES ( ${ values.join( ' ), ( ') } );`;

							await client.query( query );

							res.send( { keys } );
						}
					} catch( error ) {
						console.log( error );
						res
							.status( 400 )
							.send( { message: 'file could not be uploaded' } );
					}
				} )
				.on( 'error', err => {
					res.status( 400 ).send( { message: 'file could not be uploaded' } );
				} );
		} );
		app.listen(
			port,
			() => console.log( `App is listening on port ${ port }` )
		);
	} )
	.catch( error => console.log( error ) );