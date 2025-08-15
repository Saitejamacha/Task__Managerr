const moment = require("moment");
const Task = require("../models/taskModel");
const {
  convertToUserTimezone,
  formatForDisplay,
} = require("../services/timezoneService");

const taskController = {
  async createTask(req, res, next) {
    try {
      const { title, description, status, dueDate } = req.body;
      const userId = req.user.id;

      const formattedDueDate = dueDate
        ? moment(dueDate).format("YYYY-MM-DD HH:mm:ss")
        : null;

      const taskId = await Task.create({
        userId,
        title,
        description,
        status: status || "Pending",
        dueDate: formattedDueDate,
      });

      const task = await Task.findById(taskId, userId);
      const formattedTask = formatForDisplay(task, req.user.timezone);

      res.status(201).json(formattedTask);
    } catch (error) {
      next(error);
    }
  },

  async getAllTasks(req, res, next) {
    try {
      const userId = req.user.id;
      const tasks = await Task.findAllByUser(userId);

      const formattedTasks = tasks.map((task) =>
        formatForDisplay(task, req.user.timezone)
      );

      res.json(formattedTasks);
    } catch (error) {
      next(error);
    }
  },

  async getTaskById(req, res, next) {
    try {
      const task = await Task.findById(req.params.id, req.user.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const formattedTask = formatForDisplay(task, req.user.timezone);
      res.json(formattedTask);
    } catch (error) {
      next(error);
    }
  },

  async updateTask(req, res, next) {
    try {
      const { title, description, status, dueDate } = req.body;

      // Format the date for MySQL
      const formattedDueDate = dueDate
        ? moment(dueDate).format("YYYY-MM-DD HH:mm:ss")
        : null;

      await Task.update(req.params.id, req.user.id, {
        title,
        description,
        status,
        dueDate: formattedDueDate,
      });

      const updatedTask = await Task.findById(req.params.id, req.user.id);
      const formattedTask = formatForDisplay(updatedTask, req.user.timezone);

      res.json(formattedTask);
    } catch (error) {
      next(error);
    }
  },

  async deleteTask(req, res, next) {
    try {
      await Task.delete(req.params.id, req.user.id);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  async updateTaskStatus(req, res, next) {
    try {
      const { status } = req.body;
      await Task.updateStatus(req.params.id, req.user.id, status);

      const updatedTask = await Task.findById(req.params.id, req.user.id);
      const formattedTask = formatForDisplay(updatedTask, req.user.timezone);

      res.json(formattedTask);
    } catch (error) {
      next(error);
    }
  },

  async filterTasksByStatus(req, res, next) {
    try {
      const { status } = req.params;
      const tasks = await Task.filterByStatus(req.user.id, status);

      const formattedTasks = tasks.map((task) =>
        formatForDisplay(task, req.user.timezone)
      );

      res.json(formattedTasks);
    } catch (error) {
      next(error);
    }
  },

  async filterTasksByDate(req, res, next) {
    try {
      const { date } = req.params;
      const tasks = await Task.filterByDate(req.user.id, date);

      const formattedTasks = tasks.map((task) =>
        formatForDisplay(task, req.user.timezone)
      );

      res.json(formattedTasks);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = taskController;
