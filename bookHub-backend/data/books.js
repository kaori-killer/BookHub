let books = [
  {
    id: "1",
    bookname: "world",
    text: "HelloWorld",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/026/239/02623907.jpg?udate=20081210",
  },
  {
    id: "2",
    bookname: "cosmos",
    text: "HelloWorld season2",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/026/239/02623907.jpg?udate=20081210",
  },
];

export async function getAll() {
  return books;
}

export async function getAllByBookname(bookname) {
  return books.filter((book) => book.bookname === bookname);
}

export async function getById(id) {
  return books.find((book) => book.id === id);
}

export async function create(text, name, bookname) {
  const book = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    bookname,
  };
  books = [book, ...books];
  return book;
}

export async function update(id, text) {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.text = text;
  }
  return book;
}

export async function remove(id) {
  books = books.filter((book) => book.id !== id);
}
