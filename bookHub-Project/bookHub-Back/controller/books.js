import * as bookRepository from "../data/books.js";
import request from "request";

const client_id = "E_7i0KfAYDXbZGXED7wh";
const client_secret = "I73xFgMJIc";

// export async function getBooks(req, res) {
//   const bookname = req.query.bookname;
//   const option = {
//     d_titl: bookname,
//   };
//   const options = {
//     uri: "https://openapi.naver.com/v1/search/book_adv.json",
//     qs: option,
//     headers: {
//       "X-Naver-Client-Id": client_id,
//       "X-Naver-Client-Secret": client_secret,
//     },
//   };

//   request.get(options, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       let json = JSON.parse(body);
//       res.status(200).json(json);
//     } else {
//       res.status(response.statusCode).end();
//       console.log("error = " + JSON.stringify(response));
//     }
//   });
// }

export async function getBooks(req, res) {
  console.log("Hello");
  const bookname = req.query.bookname;
  const data = await (bookname
    ? bookRepository.getAllByBookname(bookname)
    : bookRepository.getAll());
  res.status(200).json(data);
}

export async function getById(req, res) {
  const id = req.params.id;
  const book = await bookRepository.getById(id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: `Book ${id} not found` });
  }
}

export async function createBook(req, res) {
  const { text, bookname, startDay, endDay } = req.body;
  const book = await bookRepository.create(text, bookname, startDay, endDay);

  res.status(201).json(book);
}

export async function updateBook(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const startDay = req.body.startDay;
  const endDay = req.body.endDay;

  const book = await bookRepository.update(id, text, startDay, endDay);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: `Book ${id} not found` });
  }
}

export async function deleteBook(req, res) {
  const id = req.params.id;
  await bookRepository.remove(id);

  res.sendStatus(204);
}
