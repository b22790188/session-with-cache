import { resolve } from 'path';
import connection from '../service/connect_db';

interface errorMessage {
  status: string;
  message: string;
  data?: any;
}

export default async function getUserData(username: string, password: string) {
  const sql = 'SELECT * FROM user WHERE username = ? and password = ?';
  let result: errorMessage = {} as errorMessage;

  return new Promise((resolve, reject) => {
    connection.query(sql, [username, password], (err, data) => {
      if (err) {
        (result.status = 'database error'), (result.message = '取得資料失敗');
        reject(result);
        return;
      }
      if (data.length === 0) {
        result.status = 'fail';
        result.message = '帳號或密碼錯誤';
        reject(result);
        return;
      }

      result.status = 'success';
      result.message = '取得資料成功';
      result.data = data;
      resolve(result);
      return;
    });
  });
}