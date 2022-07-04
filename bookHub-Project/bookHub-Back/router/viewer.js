import express from "express";
import "express-async-errors";
import * as bookController from "../controller/books.js";

const router = express.Router();

router.get("/", function (req, res, next) {
    res.render('main')
});

router.get("/login", function (req, res, next) {
    res.render('login')
});

router.get("/signup", function (req, res, next) {
    res.render('signup')
});

export default router;
