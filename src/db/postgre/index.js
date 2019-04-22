import { Client } from 'pg';


const client = new Client({
    user: 'postgres',
    password: 'postgres',
    database: 'mydb'
});
const dbTable = 'data';
client.connect();
/**
 * Query data from the uploaded file stored in postgreSQL
 * @param {Object} options 
 * @param {string} options.criteria
 * @param {string} options.query
 * @param {number} options.offset
 * @param {number} options.limit
 */
export function getFiltered(options) {
    const { criteria, query, offset, limit } = options;
    const queryString =
        `SELECT * FROM ${dbTable}
            WHERE ${ criteria} = '${query}'
            ${ limit ? `OFFSET ${offset} LIMIT ${limit}` : ''} `;
    return client.query(queryString);
}

/**
 * Insert daily report into DB
 * @param {string[]} keys headers
 * @param {string[]} jsonData data to save
 */
export async function setData(jsonData = []) {
    const values = jsonData.map(data => {
        return (
            `'${data.Type}', '${data.Direction}', '${data.From}',
             '${ data.To}', '${data.Extension}',
             '${ data['Forwarded To']}', '${data.Name}',
             '${ data.Date.split(' ')[1]}', '${data.Time}',
             '${ data.Action}', '${data['Action Result']}',
             '${ data['Result Description']}', '${data.Duration}',
             '${ data.Included}', '${data.Purchased}'`
        );
    });
    const query =
        `INSERT INTO ${dbTable}(
            type, direction, "from", "to", extension, "forwarded to",
            name, date, time, action, "action result",
            "result description", duration, included, purchased
         ) VALUES ( ${ values.join(' ), ( ')} );`;

    await client.query(query);
    const keys = Object.keys(jsonData[0]);
    return keys;
}