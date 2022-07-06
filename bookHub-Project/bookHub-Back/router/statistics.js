import express from "express";
import "express-async-errors";
import * as bookController from "../controller/books.js";

const router = express.Router();

// GET/ statistics
router.get("/", bookController.getStatistics);

export default router;
