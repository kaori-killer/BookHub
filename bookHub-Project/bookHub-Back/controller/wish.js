import * as wishRepository from "../data/wish.js";

export async function getWishs(req, res) {
  const bookname = req.query.bookname;
  console.log(bookname)
  const data = await (bookname
    ? wishRepository.getAllByBookname(bookname)
    : wishRepository.getAll());
  res.status(200).json(data);
}

export async function getById(req, res) {
  const id = req.params.id;
  const book = await wishRepository.getById(id);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: `Book ${id} not found` });
  }
}

export async function createWishs(req, res) {
  const { bookname, imgUrl } = req.body;
  const book = await wishRepository.create(
    bookname,
    imgUrl
  );

  res.status(201).json(book);
}

export async function deleteWish(req, res) {
  const id = req.params.id;
  await wishRepository.remove(id);

  res.sendStatus(204);
}
