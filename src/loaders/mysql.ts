import { createConnection, Connection } from 'mysql';

export class MysqlConnection {

  // service => service to singleton
  private static instance: MysqlConnection;
  private cnx: Connection;

  private constructor() {
    this.cnx = createConnection({
      host: 'localhost', // address of the server
      user: 'root', // username
      password: 'anaDondel',
      database:  'portfolio_db',
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
