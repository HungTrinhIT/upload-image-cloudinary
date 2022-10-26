const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "hypertal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudinaryUploadService = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
    );
  });
};

module.exports = {
  cloudinaryUploadService,
};
