import express from "express";
import "express-async-errors";
import * as bookController from "../controller/books.js";

const router = express.Router();

// router.get("/login", function (req, res, next) {
//     res.render('login')
// });

router.get("/", function (req, res, next) {
    res.render('login')
});

router.get("/signup", function (req, res, next) {
    res.render('signup')
});

router.get("/bookview", function (req, res, next) {
    res.render('bookview')
});

router.get("/main", function (req, res, next) {
    res.render('main')
});

router.get("/MemoryList", function (req, res, next) {
    res.render('MemoryList')
});

router.get("/wishList", function (req, res, next) {
    res.render('wishList')
});

router.get("/stastics", function (req, res, next) {
    res.render('stastics')
});

export default router;
