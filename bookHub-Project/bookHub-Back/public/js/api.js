// import axios from "axios";
// import { async } from './../../data/wish';

// let gosignup = document.getElementById("go-signup");


const SERVER_URL = "http://localhost:8080"

//id, password 보내는 함수
let login = () => {
    let userId = document.getElementById("username_login").value;
    let password = document.getElementById("password_login").value;

    axios.post(SERVER_URL + "/auth/login",
        {
            "username": userId,
            "password": password
        })
        .then((response) => {
            saveToken(response.data["token"])
        })
        .catch((error) => {
            alert(error.response.data["message"])
        });
}

let signUp = () => {
    let userId = document.getElementById("username_signup").value
    let password = document.getElementById("password_signup").value
    let passwordCheck = document.getElementById("password_check_signup").value
    let nickname = document.getElementById("nickname_signup").value
    // let email = document.getElementById("email_signup").value

    if (password === passwordCheck) {
        axios.post(SERVER_URL + "/auth/signup",
            {
                "username": userId,
                "password": password,
                "name": nickname,
                "email": "asdf@asdf.com",
                "url": null
            })
            .then((response) => {
                if (response.status === 201) { // 회원가입 성공
                    saveToken(response.data["token"])
                }
            })
            .catch((error) => {
                alert(error.response.data["message"])
            });
    } else {
        alert("비밀번호 확인 입력이 다릅니다.")
    }
}

let getInfo = () => {
    axios.get(SERVER_URL + "/auth/me", {
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    }).then((response) => {
        console.log(response)
        if (response.status === 200) {

        }
    }).catch((error) => {
        console.log(error)
        console.log(error.response)
    });
}

let search = () => {
    let search = document.getElementById("book_search_input").value

    console.log("search" + (search != null))

    axios.get(SERVER_URL + "/search?bookname=" + search).then((response) => {
        console.log(response)

        let bookInfo = response.data["items"][0]
        console.log(bookInfo)

        localStorage.setItem("bookInfo_title", bookInfo["title"])
        localStorage.setItem("bookInfo_image", bookInfo["image"])
        localStorage.setItem("bookInfo_new", "new")
        location.href = "/new"
    }).catch((error) => {
        console.log(error)
        console.log(error.response)
    })
}

let recordbook = () => {
    let id = getIdFromURL()

    if (id === "-1") {
        let textarea = document.getElementById("booksubstance").value;
        let bookview_booktitle = document.getElementById("booktitle").innerText;
        let bookview_startday = document.getElementById("startday").value;
        let bookview_endday = document.getElementById("endday").value;

        console.log("booktitle " + bookview_booktitle);

        axios.post(SERVER_URL + "/books",
            {
                "text": textarea,
                "bookname": bookview_booktitle,
                "startDay": bookview_startday,
                "endDay": bookview_endday
            })
            .then((response) => {
                if (response.status === 201) {
                    console.log(response)
                    console.log("booksave success");
                    location.href = "/main"
                }
            })
            .catch((error) => {
                console.log(error.response)
            });
    } else  {
        let textarea = document.getElementById("booksubstance").value;
        let bookview_startday = document.getElementById("startday").value;
        let bookview_endday = document.getElementById("endday").value;

        axios.put(SERVER_URL + "/books/" + id,
            {
                "text": textarea,
                "startDay": bookview_startday,
                "endDay": bookview_endday
            })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    console.log("bookedit success");
                    // location.href = "/main"
                } else {
                    console.log("bookedit failed")
                }
            })
            .catch((error) => {
                console.log(error.response)
            });
    }
}

let updateAllBooks = () => {
    axios.get(SERVER_URL + "/books")
        .then((response) => {
            let bookImages = document.getElementById("bookimage");
            // let totalCnt = response.data["data"].length
            console.log(response)

            console.log(response.status)
            if (response.status === 200) {
                let totalHTML = ""

                // let totalCnt = Math.max(response.data.length, 9)
                let totalCnt = response.data.length
                console.log("totalcnt" + totalCnt)
                
                for(let i = 0; i < totalCnt; i++) {
                    let info = response.data[i]

                    // open a div
                    if(i % 3 === 0) {
                        totalHTML += "<div class=\"col mt-4\">\n"
                    }

                    // add images
                    totalHTML += '<a href="/bookview/' + info.id + '"><img class="imgsz" src=' + '"../img/bookexample1.jpeg' + '" alt="gray"></a>';

                    // close a div
                    if(i % 3 === 2) {
                        totalHTML += "</div>"
                    }
                }

                // let estimatedCnt = Math.max(totalCnt, 9)
                let remainCnt = totalCnt - Math.floor(totalCnt / 3) * 3;
                let remainCntFinish = Math.ceil(remainCnt / 3) * 3;

                if(totalCnt <= 3) remainCntFinish += 3
                if(totalCnt <= 6) remainCntFinish += 3

                console.log("reaminCnt " + remainCnt)
                console.log("reaminCntFinish " + remainCntFinish)
                for(let i = remainCnt; i < remainCntFinish; i++) {
                    // open a div
                    if(i % 3 === 0) {
                        totalHTML += "<div class=\"col mt-4\">\n"
                    }

                    // add blank images
                    totalHTML += '<img class="imgsz" src=' + '"../img/gray.png' + '" alt="gray">';
                    // close a div
                    if(i % 3 === 2) {
                        totalHTML += "</div>"
                    }
                }

                console.log(totalHTML)
                console.log(totalCnt)

                bookImages.innerHTML = totalHTML
            }
        })
        .catch((error) => {
            console.log(error.response)
        });
}

let updatecnt = () => {
    axios.get(SERVER_URL + "/books")
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                let totalCnt = response.data.length
                console.log("totalcnt" + totalCnt)
                console.log(totalCnt)
                document.getElementById("readcount").innerHTML = totalCnt + "/10권"
            }
        })
        .catch((error) => {
            console.log(error.response)
        });
}

function getIdFromURL() {

    let id
    if(!location.href.endsWith("new"))
        id = location.href.substring(location.href.lastIndexOf('/') + 1)
    else
        id = "-1"

    console.log("id: " + id)
    return id
}

window.onload = () => {
    let loginBtn = document.getElementById("login-btn");
    let signUpBtn = document.getElementById("signup-btn");
    let searchBtn = document.getElementById("book_search_btn");
    let storeBtn = document.getElementById("store-btn");
    let readcnt = document.getElementById("analytics");

    // login 버튼을 눌렀을 시 login 함수 실행
    if (loginBtn != null)
        loginBtn.addEventListener("click", login);

    if (signUpBtn != null)
        signUpBtn.addEventListener("click", signUp);

    // 찾기버튼 있으면 메인 페이지임
    if (searchBtn != null) {
        searchBtn.addEventListener("click", search);

        updateAllBooks()
    }
    if (storeBtn != null)
        storeBtn.addEventListener("click", recordbook);

    if (readcnt != null)
        updatecnt();

    // let id = document.getElementById("bookViewId")
    let id = getIdFromURL()

    console.log("id: " + id)

    if(id != null) {
        if (id === "-1") {
            let bookTitle_bookView = document.getElementById("booktitle")
            let bookImage_bookView = document.getElementById("bookimage")
            let bookInfo_title = localStorage.getItem("bookInfo_title")
            let bookInfo_image = localStorage.getItem("bookInfo_image")

            if (bookTitle_bookView != null) {
                if (bookImage_bookView != null) {
                    if (bookInfo_title != null && bookInfo_image != null) {
                        console.log(bookInfo_title)
                        console.log(bookInfo_image)
                        bookTitle_bookView.innerHTML = bookInfo_title
                        bookImage_bookView.src = bookInfo_image
                    }
                }
            }
        } else {
            // let id = document.getElementById("bookViewId").value

            document.getElementById("textbookadd").innerHTML = "책 수정하기"
            document.getElementById("textbookaddeng").innerHTML = "EDIT BOOK"

            axios.get(SERVER_URL + "/books/" + id).then((response) => {
                let bookname = response.data["bookname"]
                let text = response.data["text"]
                let startDay = response.data["startDay"]
                let endDay = response.data["endDay"]

                document.getElementById("booktitle").innerHTML = bookname
                document.getElementById("booksubstance").value = text
                document.getElementById("startday").value = startDay
                document.getElementById("endday").value = endDay
            }).catch((error) => {
                console.log(error)
            })
        }
    } else {
        console.log("id is null")
    }
}

// 토큰 저장(로그인 상태)
function saveToken(token) {
    localStorage.setItem("token", "Bearer " + token)

    // redirect to main page
    location.href = "/main"
}