const multer = require('multer');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + uuid() + '.' + file.mimetype.split('/')[1]);
  },
});

module.exports = multer({ storage });
