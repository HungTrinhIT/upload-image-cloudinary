const fs = require("fs");
const {
  cloudinaryUploadService,
} = require("../services/cloudinaryUploadService");

const cloudinaryUpload = async (req, res, next) => {
  const file = req.file;
  const path = file.path;
  try {
    const uploadImageRes = await cloudinaryUploadService(
      path,
      process.env.CLOUDINARY_FOLDER
    );
    const { url, public_id } = uploadImageRes;
    req.file.cloudinary_url = url;
    req.file.public_id = public_id;

    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Can't delete file at: ${path}`);
      }
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { cloudinaryUpload };
