const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'assets',
  filename: (req, file, cb) => {
    cb(null, 'image-'
      + Date.now()
      + Math.floor(Math.random() * 1000)
      + path.extname(file.originalname)
    );
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
});

module.exports = upload;