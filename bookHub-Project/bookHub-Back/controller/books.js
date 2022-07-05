import * as bookRepository from "../data/books.js";

export async function getBooks(req, res) {
  const bookname = req.query.bookname;
	// 페이지 크기
	var countPerPage = 9;
	// 페이지 번호
	var pageNo = req.query.pageno;
	
  const data = await (bookname
    ? bookRepository.getAllByBookname(bookname)
    : bookRepository.getAll());

	if (countPerPage == undefined || typeof countPerPage == "undefined" || countPerPage == null) {
		countPerPage = 10;
	} else {
		countPerPage = parseInt(countPerPage);
	}
	if (pageNo == undefined || typeof pageNo == "undefined" || pageNo == null) {
		pageNo = 0;
	} else {
		pageNo = parseInt(pageNo);
	}
	
	if (pageNo > 0) {
		// 전체 크기
		var totalCount = data.length;
		// 시작 번호
		var startItemNo = ((pageNo - 1) * countPerPage);
		// 종료 번호
		var endItemNo = (pageNo * countPerPage) - 1;
		// 종료 번호가 전체 크기보다 크면 전체 크기로 변경
		if (endItemNo > (totalCount - 1)) {
			endItemNo = totalCount - 1;
		}

    var bookPageList = [];
		if (startItemNo < totalCount) {
			for (var index = startItemNo; index <= endItemNo; index++) {
				bookPageList.push(data[index]);
			}
		}

		res.status(200).json({ totalCnt: data.length, totalPage: Math.ceil(data.length / countPerPage), data: bookPageList });
	} else {
    console.log(data.length)
		res.status(200).json(data);
	}
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
  const { text, bookname, startDay, endDay, title, imgUrl } = req.body;
  const book = await bookRepository.create(
    text,
    bookname,
    startDay,
    endDay,
    title,
    imgUrl
  );

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
