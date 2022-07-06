import express from "express";
// import localStorage from "node-localstorage";
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

router.get("/bookview/:id", function (req, res, next) {
    const id = req.params.id;


    // localStorage.setItem("bookInfo_id", id)
    // localStorage.setItem("bookInfo_new", "edit")

    res.render('bookview')
});

router.get("/new", function (req, res, next) {
    // localStorage.setItem("bookInfo_new", "new")

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
