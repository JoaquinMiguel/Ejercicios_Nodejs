const multer = require('multer');
//const path = require('path');

/* Multer Storage */
const multerStorage = multer.diskStorage({ // documentacion npm multer
    destination: function (req, file, cb) {
      cb(null, 'uploads')   //path.join(__dirname, '../uploads') ) 
    },
    filename: function (req, file, cb) {
      const body = req.body;
      const ext = file.mimetype.split('/')[1]; // poner solo formato de archivo!!

      cb(null, body.title + '.'+ ext)
      
    }
});

/* Multer Filter */
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadSingle = upload.single('thumbnail');