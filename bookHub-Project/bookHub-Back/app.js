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

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(helmet());
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

app.listen(8080);

