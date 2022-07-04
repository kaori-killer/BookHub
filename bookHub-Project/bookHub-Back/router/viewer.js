import express from "express";
import "express-async-errors";
import * as bookController from "../controller/books.js";

const router = express.Router();

// GET/ books
// GET/ books?bookname=bookname
router.get("/", function (req, res, next) {
    res.render('main')
});

router.get("/login", function (req, res, next) {
    // res.setHeader('Content-Security-Policy', "script-src https://unpkg.com/");
    res.render('login')
});

router.get("/signup", function (req, res, next) {
    // res.setHeader('Content-Security-Policy', "script-src https://unpkg.com/");
    res.render('signup')
});

export default router;
