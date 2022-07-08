const cloudinary = require('cloudinary').v2;

const util = require('util');
exports.upload = util.promisify(cloudinary.uploader.upload);
exports.destroy = util.promisify(cloudinary.uploader.destroy);
