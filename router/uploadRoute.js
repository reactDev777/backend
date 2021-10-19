import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const fileUpload = upload.fields([{ name: "image-file", maxCount: 1 }]);

router.post("/upload", fileUpload, (req, res) => {
  console.log(req.body);
  res.json({ message: "image Uploaded" });
});

// router.post("/upload", upload.fields("image"), (req, res) => {
//   console.log(req.file);
//   res.send(`/${req.file.path}`);
// });

export default router;
