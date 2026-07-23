const multer = require('multer');
const path = require('path');
const fs = require('fs');

function uploadTo(folderName) {
  const uploadPath = path.join(__dirname, '../../public/image', folderName);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  return multer({ storage });
}

module.exports = { uploadTo };
