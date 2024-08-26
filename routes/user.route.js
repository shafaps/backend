const express = require('express');
const route = express.Router();
const { getAllUser, addUser, getUserById, loginUser, logoutUser, deleteUser } = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/authenticateToken');

// GET all users
route.get("/", getAllUser);

// POST request to register a new user
route.post("/register", addUser);

// GET request to fetch a user by ID
route.get("/:id", authenticateToken, getUserById);

// POST request to log in a user
route.post("/login", loginUser);

// POST request to log out a user
route.post("/logout", logoutUser);

// DELETE request to delete a user by ID
route.delete("/delete/:id", deleteUser);

module.exports = route;
