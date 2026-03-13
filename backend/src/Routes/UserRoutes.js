import express from "express";
import { createUser, deleteUser, updateUser, getAllUsers, getUserById,logInUser} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/auth",logInUser);
router.post("/add", createUser);

router.patch("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

export default router;