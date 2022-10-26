const multer = require("multer");
const { uploadImageService } = require("../services/uploadImageService");

const imageUpload = (req, res, next) => {
  const uploader = uploadImageService.single("image");
  uploader(req, res, (err) => {
    // Handle upload file error
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        msg: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }

    next();
  });
};

module.exports = {
  imageUpload,
};
