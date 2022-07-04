import request from "request";

const client_id = "E_7i0KfAYDXbZGXED7wh";
const client_secret = "I73xFgMJIc";

export async function searchBooks(req, res) {
  const bookname = req.query.bookname;
  const option = {
    d_titl: bookname,
    display: 30,
  };

  const options = {
    uri: "https://openapi.naver.com/v1/search/book_adv.json",
    qs: option,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let json = JSON.parse(body);
      res.status(200).json(json);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + JSON.stringify(response));
    }
  });
}
