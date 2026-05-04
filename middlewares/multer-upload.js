import multer from "multer";

class MulterMiddleware {
  imageUpload() {
    const FIVE_MB = 5 * 1024 * 1024;

    const uploadImage = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: FIVE_MB,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
          cb(null, true);
        } else {
          cb(new Error("Only image files are allowed!"), false);
        }
      },
    });
    return uploadImage.single("image");
  }
  fileUpload() {
    const savedPath = "uploads/";
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, savedPath);
      },

      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
    const upload = multer({ storage });
    return upload.single("file");
  }
}

const multerMiddleware = new MulterMiddleware();

export default multerMiddleware;
