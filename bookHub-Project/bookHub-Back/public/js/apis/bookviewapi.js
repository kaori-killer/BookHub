
const SERVER_URL = "http://localhost:8080";

let deletebook = () => {
    let id = getIdFromURL();

    axios.delete(SERVER_URL + "/books/" + id, {
    })
        .then((response) => {
            if (response.status === 204) {
                // console.log(response);
                console.log("delete book success")
                location.href = "/main";
            }
        })
        .catch((error) => {
            console.log(error.response);
        });
}

let recordbook = () => {
    let id = getIdFromURL();

    if (id === "-1") {
        let textarea = document.getElementById("booksubstance").value;
        let bookview_booktitle = document.getElementById("booktitle").innerText;
        let bookview_startday = document.getElementById("startday").value;
        let bookview_endday = document.getElementById("endday").value;
        let bookview_imageLink = document.getElementById("bookimage").src;

        console.log("booktitle " + bookview_booktitle);
        console.log("bookLink " + bookview_imageLink);

        axios.post(SERVER_URL + "/books", {
            "text": textarea,
            "bookname": bookview_booktitle,
            "startDay": bookview_startday,
            "endDay": bookview_endday,
            "imgUrl": bookview_imageLink
        })
            .then((response) => {
                if (response.status === 201) {
                    // console.log(response);
                    console.log("booksave success");
                    location.href = "/main";
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    } else {
        let textarea = document.getElementById("booksubstance").value;
        let bookview_startday = document.getElementById("startday").value;
        let bookview_endday = document.getElementById("endday").value;

        axios.put(SERVER_URL + "/books/" + id, {
            text: textarea,
            startDay: bookview_startday,
            endDay: bookview_endday,
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response);
                    console.log("bookedit success");
                    // location.href = "/main"
                } else {
                    console.log("bookedit failed");
                }
            })
            .catch((error) => {
                console.log(error.response);
            });
    }
};

window.onload = () => {
    let storeBtn = document.getElementById("store-btn");
    let deleteBtn = document.getElementById("delete-btn");

    if (storeBtn != null)
        storeBtn.addEventListener("click", recordbook);

    if (deleteBtn != null)
        deleteBtn.addEventListener("click", deletebook);

    // bookview 로드시 id에 따른 책 로드
    let id = getIdFromURL();

    if (id != null) {
        if (id === "-1") {
            document.getElementById("textbookadd").innerHTML = "책 추가하기";
            document.getElementById("textbookaddeng").innerHTML = "ADD BOOK";

            let bookTitle_bookView = document.getElementById("booktitle");
            let bookImage_bookView = document.getElementById("bookimage");
            let bookInfo_title = localStorage.getItem("bookInfo_title");
            let bookInfo_image = localStorage.getItem("bookInfo_image");

            if (bookTitle_bookView != null) {
                if (bookImage_bookView != null) {
                    if (bookInfo_title != null && bookInfo_image != null) {
                        bookTitle_bookView.innerHTML = bookInfo_title;
                        bookImage_bookView.src = bookInfo_image;
                    }
                }
            }
        } else {
            // let id = document.getElementById("bookViewId").value

            document.getElementById("textbookadd").innerHTML = "책 수정하기";
            document.getElementById("textbookaddeng").innerHTML = "EDIT BOOK";

            axios.get(SERVER_URL + "/books/" + id)
                .then((response) => {
                    let bookname = response.data["bookname"];
                    let text = response.data["text"];
                    let startDay = response.data["startDay"];
                    let endDay = response.data["endDay"];
                    let imgUrl = response.data["imgUrl"];

                    document.getElementById("booktitle").innerHTML = bookname;
                    document.getElementById("booksubstance").value = text;
                    document.getElementById("startday").value = startDay;
                    document.getElementById("endday").value = endDay;
                    document.getElementById("bookimage").src = imgUrl;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    } else {
        console.log("id is null");
    }
}

function getIdFromURL() {
    let id;
    if (!location.href.endsWith("new"))
        id = location.href.substring(location.href.lastIndexOf("/") + 1);
    else id = "-1";

    // console.log("id: " + id);
    return id;
}