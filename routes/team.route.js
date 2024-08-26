const express = require('express');
const route = express.Router();
const {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMemberById,
  getAllTeamMembers
} = require('../controllers/team.controller');
const { authenticateToken } = require('../middleware/authenticateToken');
const upload = require('../middleware/uploads'); // Ensure this path is correct

// GET all team members
route.get("/", getAllTeamMembers);

// GET a single team member by ID
route.get("/:id", getTeamMemberById);

// POST request to create a new team member (authentication required)
route.post("/", authenticateToken, upload.single('image'), createTeamMember); // Use multer for file upload

// PUT request to update an existing team member (authentication required)
route.put("/:id", authenticateToken, upload.single('image'), updateTeamMember); // Use multer for file upload

// DELETE request to delete a team member by ID (authentication required)
route.delete("/:id", authenticateToken, deleteTeamMember);

module.exports = route;
