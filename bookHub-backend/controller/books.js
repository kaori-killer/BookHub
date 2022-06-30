import * as bookRepository from "../data/books.js";

export async function getBooks(req, res) {
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
  const { text, name, bookname } = req.body;
  const book = await bookRepository.create(text, name, bookname);

  res.status(201).json(book);
}

export async function updateBook(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const book = await bookRepository.update(id, text);
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
