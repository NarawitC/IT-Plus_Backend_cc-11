const cloudinary = require('./cloundinary');

module.exports = async (databaseImg, path) => {
  const result = await cloudinary.upload(path);
  if (databaseImg) {
    const splitted = databaseImg.split('/');
    const publicId = splitted[splitted.length - 1].split('.')[0];
    await cloudinary.destroy(publicId);
  }
  return result.secure_url;
};
