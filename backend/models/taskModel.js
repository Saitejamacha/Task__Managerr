const pool = require("../config/db");
const moment = require("moment");

const Task = {
  async create({ userId, title, description, status, dueDate }) {
    // Format the date for MySQL
    const formattedDueDate = dueDate
      ? moment(dueDate).format("YYYY-MM-DD HH:mm:ss")
      : null;

    const [result] = await pool.execute(
      "INSERT INTO tasks (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)",
      [userId, title, description, status, formattedDueDate]
    );
    return result.insertId;
  },

  async findAllByUser(userId) {
    const [rows] = await pool.execute("SELECT * FROM tasks WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  },

  async findById(id, userId) {
    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId]
    );
    return rows[0];
  },

  async update(id, userId, { title, description, status, dueDate }) {
    // Format the date for MySQL
    const formattedDueDate = dueDate
      ? moment(dueDate).format("YYYY-MM-DD HH:mm:ss")
      : null;

    await pool.execute(
      "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?",
      [title, description, status, formattedDueDate, id, userId]
    );
  },

  async delete(id, userId) {
    await pool.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);
  },

  async updateStatus(id, userId, status) {
    await pool.execute(
      "UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?",
      [status, id, userId]
    );
  },

  async filterByStatus(userId, status) {
    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE user_id = ? AND status = ?",
      [userId, status]
    );
    return rows;
  },

  async filterByDate(userId, date) {
    const [rows] = await pool.execute(
      "SELECT * FROM tasks WHERE user_id = ? AND DATE(due_date) = ?",
      [userId, date]
    );
    return rows;
  },
};

module.exports = Task;
