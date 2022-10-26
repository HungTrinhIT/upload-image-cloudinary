const express = require("express");

const uploadsRouter = require("./uploads");

const router = express.Router();

router.use("/uploads", uploadsRouter);

module.exports = router;
