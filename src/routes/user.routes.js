import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    getAllAppointments,
    getAllVisitedPatients
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/appointments").get(verifyJWT, getAllAppointments);
router.route("/allPatientDetails").get(verifyJWT, getAllVisitedPatients);



export default router;