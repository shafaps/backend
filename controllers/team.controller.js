const { Team } = require('../models');
const imagekit = require('../config/imagekit.config'); // Import ImageKit configuration

module.exports = {
    // Create a new team member
    // Create a new team member
    createTeamMember: async (req, res) => {
        try {
            const { name, position, link_profile, link_github, linkedin, link_instagram } = req.body;
            const file = req.file; // Get the uploaded file

            let imageUrl = null;

            // Check if a file was uploaded
            if (file) {
                // Upload to ImageKit
                const result = await imagekit.upload({
                    file: file.buffer.toString('base64'), // Convert file buffer to base64
                    fileName: file.originalname, // Use the original file name
                    folder: 'team_members', // Optional: specify a folder in ImageKit
                });
                imageUrl = result.url; // Get the URL of the uploaded image
            }

            // Create the new team member in the database
            const newTeamMember = await Team.create({
                name,
                position,
                link_profile,
                link_github,
                linkedin,
                link_instagram,
                image: imageUrl, // Save the image URL
            });

            // Respond with the created team member
            res.status(201).json({
                message: "Team member created successfully",
                data: newTeamMember,
            });
        } catch (error) {
            console.error('Error creating team member:', error);
            res.status(500).json({
                message: "Error creating team member",
                error: error.message, // Send the error message in the response
            });
        }
    },

    // Update an existing team member
    updateTeamMember: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, position, link_profile, link_github, linkedin, link_instagram } = req.body;
            const file = req.file;

            const teamMember = await Team.findByPk(id);
            if (!teamMember) {
                return res.status(404).json({
                    message: "Team member not found"
                });
            }

            let imageUrl = teamMember.image;

            if (file) {
                const result = await imagekit.upload({
                    file: file.buffer.toString('base64'),
                    fileName: file.originalname
                });
                imageUrl = result.url;

                // Optionally delete the old image from ImageKit if needed
                // await imagekit.deleteFile(teamMember.imageFileId);
            }

            await teamMember.update({
                name,
                position,
                link_profile: link_profile || teamMember.link_profile,
                link_github: link_github || teamMember.link_github,
                linkedin: linkedin || teamMember.linkedin,
                link_instagram: link_instagram || teamMember.link_instagram,
                image: imageUrl,
            });

            res.json({
                message: "Team member updated successfully",
                data: teamMember
            });
        } catch (error) {
            res.status(500).json({
                message: "Error updating team member",
                error: error.message
            });
        }
    },

    // Get all team members
    getAllTeamMembers: async (req, res) => {
        try {
            const teamMembers = await Team.findAll();
            res.json({
                message: "Team members retrieved successfully",
                data: teamMembers
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching team members",
                error: error.message
            });
        }
    },

    // Get a single team member by ID
    getTeamMemberById: async (req, res) => {
        try {
            const { id } = req.params;
            const teamMember = await Team.findByPk(id);
            if (!teamMember) {
                return res.status(404).json({
                    message: "Team member not found"
                });
            }
            res.json({
                message: "Team member retrieved successfully",
                data: teamMember
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching team member",
                error: error.message
            });
        }
    },

    deleteTeamMember: async (req, res) => {
      try {
          const { id } = req.params;
          const teamMember = await Team.findByPk(id);
          if (!teamMember) {
              return res.status(404).json({
                  message: "Team member not found"
              });
          }

  
          await teamMember.destroy();
          res.json({
              message: "Team member deleted successfully"
          });
      } catch (error) {
          res.status(500).json({
              message: "Error deleting team member",
              error: error.message
          });
      }
  }
  
};
