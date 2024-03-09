import {Router} from "express";

import * as rh from "./request-handlers.js";
import auth from "./middleware/auth.js";

const router = Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/static/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/movies").post(auth,rh.movies);
router.route("/index").get(rh.index);

// router.route('/add').post(upload.array('image', 5), rh.add);

export default router;