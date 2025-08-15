const pool = require("../config/db");

const User = {
  async create({ username, email, password, timezone }) {
    const [result] = await pool.execute(
      "INSERT INTO users (username, email, password, timezone) VALUES (?, ?, ?, ?)",
      [username, email, password, timezone]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute(
      "SELECT id, username, email, timezone FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async updateTimezone(userId, timezone) {
    await pool.execute("UPDATE users SET timezone = ? WHERE id = ?", [
      timezone,
      userId,
    ]);
  },
};

module.exports = User;
