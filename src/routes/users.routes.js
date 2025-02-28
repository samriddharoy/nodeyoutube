import { Router } from "express"
import { registeruser } from "../controllers/user.controllers.js";  
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",        //mddleware use here  before method
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount: 1
        }

    ]),
    registeruser
)


export default router