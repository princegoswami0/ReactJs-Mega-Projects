import multer from 'multer';

//configure storage

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//file filter 

const fileFilter = (req, file, cb) => {
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {  
    cb(new Error ('only .jpeg, .jpg and .png files are allowed'), false);
  }
};


const upload = multer({storage, fileFilter});

export default upload;