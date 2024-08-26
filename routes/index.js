const express = require('express');
const route = express.Router();
const userRoute = require('./user.route');
const projectRoute = require('./project.route');
const teamRoute = require('./team.route');
const contactRoute = require('./contact.route'); // Import the contact route
const imagekitRoutes = require('./imagekit.route');

route.get("/", (req, res) => {
    res.json("success");
});

route.use("/users", userRoute);
route.use('/projects', projectRoute);
route.use('/teams', teamRoute);
route.use('/contact', contactRoute); // Add the contact route here
route.use('/imagekit', imagekitRoutes);
module.exports = route;
