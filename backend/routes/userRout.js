import  express from "express";
// import  upload  from "../middleware/multer.midelware.js"
import  { regi_Controller, login_Controller ,logout_Controller} from "../controlers/userControler.js"
import { verifyJWT } from "../middleware/auth.middleware.js";
 
// const {protect}= require("../middleware/authmiddleware.js");

const router = express.Router();

// router.post('/register',  upload.single("dp") , regi_Controller );
router.post('/register', regi_Controller );
router.post('/login',  login_Controller );

//secured router    (logout using verifyJWT middleware)
router.post("/logout",verifyJWT, logout_Controller)


export default router; 