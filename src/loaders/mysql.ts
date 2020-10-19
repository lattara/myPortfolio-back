import { createConnection, Connection } from 'mysql';

export class MysqlConnection {

  // service => service to singleton
  private static instance: MysqlConnection;
  private cnx: Connection;

  private constructor() {
    this.cnx = createConnection({
      host: process.env.DB_HOST, // address of the server
      user: process.env.DB_USERNAME, // username
      password: process.env.DB_USER_PASSWORD,
      database:  process.env.DB_DATABASE,
    });
  }

  static getInstance() {
      if (!this.instance) {
          this.instance = new MysqlConnection();
      }
      return this.instance;
  }

  query(sql: string, params: any[] = []) {
    return new Promise((resolve, reject) => {
      this.cnx.query(sql, params, (err, results) => {
          if (err) {
            console.log(err)
            return reject(err);
          }
          resolve(results);
      });
    });
  }
}
