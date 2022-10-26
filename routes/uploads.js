const express = require("express");
const { cloudinaryUpload } = require("../middlewares/cloudinaryUpload");
const { imageUpload } = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/image", imageUpload, cloudinaryUpload, async (req, res) => {
  try {
    const { mimetype, cloudinary_url, size } = req.file;

    return res.json({
      msg: "Image uploaded successfully",
      data: {
        mimetype,
        url: cloudinary_url,
        size,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
