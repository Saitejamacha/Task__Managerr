const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { jwtSecret, jwtExpiresIn } = require("../config/jwt");
const User = require("../models/userModel");

const authController = {
  async register(req, res, next) {
    try {
      const { username, email, password, timezone } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.create({
        username,
        email,
        password: hashedPassword,
        timezone: timezone || "UTC",
      });

      const token = jwt.sign({ id: userId }, jwtSecret, {
        expiresIn: jwtExpiresIn,
      });

      res.status(201).json({
        id: userId,
        username,
        email,
        timezone: timezone || "UTC",
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: jwtExpiresIn,
      });

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        timezone: user.timezone,
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req, res, next) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateTimezone(req, res, next) {
    try {
      const { timezone } = req.body;
      await User.updateTimezone(req.user.id, timezone);
      res.json({ message: "Timezone updated successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
