const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users",userRoutes);

const blogRoutes = require("./blogRoutes");
router.use("/blogs",blogRoutes);

module.exports = router;