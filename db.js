import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1224E4bd',
});

connection.connect();

export default connection;
