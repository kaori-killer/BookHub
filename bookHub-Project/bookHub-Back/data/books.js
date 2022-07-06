let books = [
  {
    id: "1",
    bookname: "world",
    text: "HelloWorld",
    isComplete: false,
    startDay: "2022.03.22",
    endDay: "2022.04.22",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/026/239/02623907.jpg?udate=20081210",
  },
  {
    id: "2",
    bookname: "world",
    text: "id 2 book",
    isComplete: false,
    startDay: "2022.03.22",
    endDay: "2022.04.22",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/026/239/02623907.jpg?udate=20081210",
  },
];

export async function getAll() {
  // 현재 날짜보다 완독일이 이전이면 완독 체크
  for (const book of books) {
    const today = new Date();
    const endDate = new Date(book.endDay.replace('.', '-'));
    if (today >= endDate) {
      book.isComplete = true
    }
  }
  
  return books;
}

export async function getAllByBookname(bookname) {
  return books.filter((book) => book.bookname === bookname);
}

export async function getById(id) {
  return books.find((book) => book.id === id);
}

export async function create(text, bookname, startDay, endDay, imgUrl) {
  const book = {
    id: Date.now().toString(),
    isComplete: false,
    createdAt: new Date(),
    text,
    bookname,
    startDay,
    endDay,
    imgUrl
  };

  books = [book, ...books];
  return book;
}

export async function update(id, text, startDay, endDay) {
  const book = books.find((book) => book.id === id);

  if (book) {
    book.text = text;
    book.startDay = startDay;
    book.endDay = endDay;
  }

  return book;
}

export async function remove(id) {
  books = books.filter((book) => book.id !== id);
}

export async function countCompleteBook() {
  return books.filter((book) => book.isComplete == true);
}
