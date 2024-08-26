const { Project } = require('../models');
const imagekit = require('../config/imagekit.config'); // Import ImageKit configuration

module.exports = {
    // Create a new project
    createProject: async (req, res) => {
        try {
            const { name, description, link_project } = req.body;
            const file = req.file; // Get the uploaded file

            let imageUrl = null;

            // Check if a file was uploaded
            if (file) {
                // Upload to ImageKit
                const result = await imagekit.upload({
                    file: file.buffer.toString('base64'), // Convert file buffer to base64
                    fileName: file.originalname, // Use the original file name
                    folder: 'projects', // Optional: specify a folder in ImageKit
                });
                imageUrl = result.url; // Get the URL of the uploaded image
            }

            // Create the new project in the database
            const newProject = await Project.create({
                name,
                description,
                link_project,
                image: imageUrl, // Save the image URL
            });

            // Respond with the created project
            res.status(201).json({
                message: "Project created successfully",
                data: newProject,
            });
        } catch (error) {
            console.error('Error creating project:', error);
            res.status(500).json({
                message: "Error creating project",
                error: error.message, // Send the error message in the response
            });
        }
    },

    // Update an existing project
    updateProject: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, link_project } = req.body;
            const file = req.file;

            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }

            let imageUrl = project.image;

            if (file) {
                const result = await imagekit.upload({
                    file: file.buffer.toString('base64'),
                    fileName: file.originalname
                });
                imageUrl = result.url;

                // Optionally delete the old image from ImageKit if needed
                // await imagekit.deleteFile(project.imageFileId);
            }

            await project.update({
                name,
                description,
                image: imageUrl,
                link_project: link_project || project.link_project
            });

            res.json({
                message: "Project updated successfully",
                data: project
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating project",
                error: error.message
            });
        }
    },

    // Get all projects
    getAllProjects: async (req, res) => {
        try {
            const projects = await Project.findAll();
            res.json({
                message: "Projects retrieved successfully",
                data: projects
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching projects",
                error: error.message
            });
        }
    },

    // Get a single project by ID
    getProjectById: async (req, res) => {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }
            res.json({
                message: "Project retrieved successfully",
                data: project
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching project",
                error: error.message
            });
        }
    },

    // Delete a project
    deleteProject: async (req, res) => {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }

            // Optionally delete the image from ImageKit if needed
            // if (project.imageFileId) {
            //     await imagekit.deleteFile(project.imageFileId);
            // }

            await project.destroy();
            res.json({
                message: "Project deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error deleting project",
                error: error.message
            });
        }
    }
};
