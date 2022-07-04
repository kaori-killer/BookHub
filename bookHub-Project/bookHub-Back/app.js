import express from "express";
import ejs from "ejs";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import bookRouter from "./router/books.js";
import authRouter from "./router/auth.js";
import searchRouter from "./router/search.js";
import viewerRouter from "./router/viewer.js";
import testRouter from "./router/test.js";

const app = express();
const __dirname = path.resolve();

// var path = require('path');

app.set('views', path.join(__dirname, 'public/views'));
// app.set('views', __dirname + "/views")
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     // defaultSrc: ["'self'", 'data:', 'blob:'],
//
//     // fontSrc: ["'self'", 'https:', 'data:'],
//
//     scriptSrc: ["'self'", 'unsafe-inline'],
//
//     // scriptSrc: ["'self'", 'https://*.cloudflare.com'],
//
//     // scriptSrcElem: ["'self'",'https:', 'https://*.cloudflare.com'],
//
//     // styleSrc: ["'self'", 'https:', 'unsafe-inline'],
//
//     // connectSrc: ["'self'", 'data', 'https://*.cloudflare.com']
//   },
// }))

app.use(cors());
app.use(morgan("tiny"));

app.use("/books", bookRouter);
app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/test", testRouter);
app.use("/", viewerRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// const router = app.Router();
// router.get('/', function (req, res, next) {
//   res.render('index', { title: "몰?"})
// });

app.listen(8080);

