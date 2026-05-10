import multer from "multer";
import fs from "node:fs";

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
	
    const clearAllRelativeWithCurrentFile = (filename) => {
      fs.readdir("../uploads", (err, files) => {
        if (err) console.log(err);

        for (let i = 0; i < files.length; i++) {
          const regex = new RegExp(`\\d+-${filename}$`, "i");
          if (regex.test(files[i])) {
            fs.unlink(`../uploads/${files[i]}`, (err, data) => {
              if (err) console.log(err);
            });
          }
        }
      });
    };

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, savedPath);
      },

      filename: (req, file, cb) => {
        clearAllRelativeWithCurrentFile(filename);
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage });
    return upload.single("file");
  }
}

const multerMiddleware = new MulterMiddleware();

export default multerMiddleware;
