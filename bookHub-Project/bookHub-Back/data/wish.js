let wishs = [
  {
    id: "1",
    bookname: "world",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/157/684/15768427.jpg?type=m1&udate=20200109",
  },
  {
    id: "2",
    bookname: "id 2 book",
    createdAt: Date.now().toString(),
    imgUrl:
      "https://bookthumb-phinf.pstatic.net/cover/157/688/15768835.jpg?type=m1&udate=20211014",
  },
];

export async function getAll() {
  return wishs;
}

export async function getAllByBookname(bookname) {
  return wishs.filter((wish) => wish.bookname === bookname);
}

export async function getById(id) {
  return wishs.find((wish) => wish.id === id);
}

export async function create(bookname, imgUrl) {
  const wish = {
    id: Date.now().toString(),
    createdAt: new Date(),
    bookname,
    imgUrl,
  };
  wishs = [wish, ...wishs];
  return wish;
}

export async function remove(id) {
  wishs = wishs.filter((wish) => wish.id !== id);
}
