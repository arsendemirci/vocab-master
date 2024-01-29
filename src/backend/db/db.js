const Path = require("pathUtils");
const sqlite3 = require("sqlite3").verbose();
const query = require("./query.js");

class AppDao {
  constructor() {
    this.db = new sqlite3.Database(
      Path.dbFile, // my root folder if in dev mode
      (err) => {
        if (err) {
          console.log(`Database Error: ${err}`);
        } else {
          console.log("Database Loaded");
        }
      }
    );
    this.query = { ...query };
  }
  all(sqlQuery, params) {
    return new Promise((resolve, reject) => {
      this.db.all(sqlQuery, params, (err, rows) => {
        this.db.close((error) => {
          if (error) {
            console.log(`Database close error: ${error}`);
          } else {
            console.log("Database closed");
          }
        });

        if (err) {
          // case error
          reject(err);
        }
        resolve(rows);
      });
    });
  }
}
module.exports = AppDao;
