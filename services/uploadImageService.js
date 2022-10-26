const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const { MulterError } = require("multer");

// Our system supports these files are listed below
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

// The maximum uploaded image size
// 2 * 1024 * 1024 =  2MB
const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024;

const generateFilename = (file) => {
  return `${new Date().valueOf()}${crypto
    .createHash("md5")
    .update(file.fieldname)
    .digest("hex")}${path.extname(file.originalname)}`;
};

const storageInstance = multer.diskStorage({
  destination: (req, file, cb) => {
    const __dirname = require("path").resolve("./");
    const dir = path.join(__dirname, "uploaded_images");

    fs.mkdir(dir, (err) => {
      cb(null, "uploaded_images");
    });
  },

  filename: (req, file, cb) => {
    const uploadedFilename = generateFilename(file);
    cb(null, uploadedFilename);
  },
});

const fileFilterFn = (req, file, cb) => {
  const fileType = file.mimetype;
  const isFileValid = ACCEPTED_IMAGE_TYPES.includes(fileType);

  if (isFileValid) {
    cb(null, true);
  } else {
    cb(
      new MulterError("LIMIT_UNEXPECTED_FILE", "Unsupported file format"),
      false
    );
  }
};

const uploadImageService = multer({
  storage: storageInstance,
  fileFilter: fileFilterFn,
  limits: {
    fileSize: MAXIMUM_IMAGE_SIZE,
  },
});

module.exports = { uploadImageService };
