import * as mysql from 'mysql';
import { DBConfig } from '../config/config';

const connection = mysql.createConnection({
  host: DBConfig.host,
  user: DBConfig.user,
  port: parseInt(DBConfig.port || '3306', 10),
  password: DBConfig.password,
  database: DBConfig.database,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('Connect to MySQL server');
});

export default connection;
