const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const blacklist = new Set();

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.findAll({ attributes: { exclude: ["password"] } });
            res.json({ message: "success", data: users });
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.user.id); // Use req.user.id directly
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'success', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },
    addUser: async (req, res) => {
        try {
            const { firstName, lastName, email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ firstName, lastName, email, username, password: hashedPassword });
            res.status(201).json({ message: "User created successfully", data: newUser });
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error: error.message });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return res.status(401).json({ message: "Invalid matched email or password" });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid matched email or password" });
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ message: "Login successful", token });
        } catch (error) {
            res.status(500).json({ message: "Error logging in", error: error.message });
        }
    },
    logoutUser: (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(400).json({ message: "No token provided" });
            blacklist.add(token);
            res.json({ message: "Logout successful" });
        } catch (error) {
            res.status(500).json({ message: "Error logging out", error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            await user.destroy();
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error: error.message });
        }
    }
};
