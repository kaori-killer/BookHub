import express from "express";
import "express-async-errors";
import * as wishController from "../controller/wish.js";

const router = express.Router();

// GET/ wishs
router.get("/", wishController.getWishs);

// GET / wishs/:id
router.get("/:id", wishController.getById);

// POST / wishs
router.post("/", wishController.createWishs);

// DELETE/wishs/:id
router.delete("/:id", wishController.deleteWish);

export default router;
