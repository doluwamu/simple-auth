import pool from "../db.js";
import bcrypt from "bcryptjs";

class userQuery {
  constructor(name = "", email = "", password = "") {
    (this.name = name), (this.email = email), (this.password = password);
  }

  hashedPassword = async () => {
    return this.password && this.password.length > 0
      ? await bcrypt.hash(this.password, 10)
      : null;
  };

  allUsers = () => {
    return pool.query("SELECT id, name, email FROM user");
  };

  createUserAccount = async () => {
    return pool.query(
      `INSERT INTO user (name, email, password) VALUES ('${this.name}', '${
        this.email
      }', '${await this.hashedPassword()}');`,
    );
  };

  userExists = () => {
    return pool.query(`SELECT * FROM user WHERE email = '${this.email}';`);
  };

  userExistsById = (id) => {
    return pool.query(`SELECT * FROM user WHERE id = ${id};`);
  };

  editUser = async (id) => {
    return pool.query(
      `UPDATE user SET name = '${this.name}', email = '${
        this.email
      }', password = '${await this.hashedPassword()}' WHERE id = ${id}`,
    );
  };

  removeUser = async (id) => {
    return await pool.query(`DELETE FROM user WHERE id = ${id}`);
  };
}

export default userQuery;
