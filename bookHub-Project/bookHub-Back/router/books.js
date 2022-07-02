import express from "express";
import "express-async-errors";
import * as bookController from "../controller/books.js";

const router = express.Router();

// GET/ books
// GET/ books?bookname=bookname
router.get("/", bookController.getBooks);

// GET / books/:id
router.get("/:id", bookController.getById);

// POST / books
router.post("/", bookController.createBook);

// PUT/ books/:id
router.put("/:id", bookController.updateBook);

// DELETE/tweets/:id
router.delete("/:id", bookController.deleteBook);

export default router;
