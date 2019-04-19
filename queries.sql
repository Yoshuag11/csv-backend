CREATE TABLE data(
	id SERIAL PRIMARY KEY,
	type VARCHAR( 20 ),
	direction VARCHAR( 20 ),
	"from" VARCHAR( 20 ),
	"to" VARCHAR( 20 ),
	extension VARCHAR( 20 ),
	"forwarded to" VARCHAR( 20 ),
	name VARCHAR( 20 ),
	date DATE,
	time TIME,
	action VARCHAR( 20 ),
	"action result" VARCHAR( 20 ),
	"result description" VARCHAR( 200 ),
	duration VARCHAR( 20 ),
	included VARCHAR( 20 ),
	purchased VARCHAR( 20 )
);

DROP TABLE data;

INSERT INTO data (
	type,
	direction,
	"from",
	"to",
	extension,
	"forwarded to",
	name,
	date,
	time,
	action,
	"action result",
	"result description",
	duration,
	included,
	purchased
)
VALUES (
	'Voice',
	'Incoming',
	'(000) 000-0000',
	'(001) 000-0001',
	'',
	'',
	'NAME_0',
	'04/11/2019',
	'10:41 PM',
	'Phone Call',
	'Missed',
	'',
	'0:00:02',
	'0',
	'-'
);