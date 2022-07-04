import express from "express";
import "express-async-errors";
import * as searchController from "../controller/search.js";

const router = express.Router();

// GET/ books
// GET/ books?bookname=bookname
router.get("/", searchController.searchBooks);

export default router;
