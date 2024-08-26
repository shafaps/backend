const express = require('express');
const route = express.Router();
const {
    createProject,
    updateProject,
    getAllProjects,
    getProjectById,
    deleteProject
} = require('../controllers/project.controller');
const { authenticateToken } = require('../middleware/authenticateToken');
const upload = require('../middleware/uploads'); // Adjust the path as necessary

// GET all projects
route.get("/", getAllProjects);

// GET a single project by ID
route.get("/:id", getProjectById);

// POST request to create a new project (authentication required)
route.post("/", upload.single('image'), createProject); // Use multer for file upload

// PUT request to update an existing project (authentication required)
route.put("/:id", upload.single('image'), updateProject); // Use multer for file upload

// DELETE request to delete a project by ID (authentication required)
route.delete("/:id", deleteProject);

module.exports = route;
