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
            "username":userId,
            "password":password
        })
        .then((response)=>{
            saveToken(response.data["token"])
        })
        .catch((error)=>{
            alert(error.response.data["message"])
        });
}

let signUp = () => {
    let userId = document.getElementById("username_signup").value
    let password = document.getElementById("password_signup").value
    let passwordCheck = document.getElementById("password_check_signup").value
    let nickname = document.getElementById("nickname_signup").value
    // let email = document.getElementById("email_signup").value

    if(password === passwordCheck) {
        axios.post(SERVER_URL + "/auth/signup",
            {
                "username": userId,
                "password": password,
                "name": nickname,
                "email": "asdf@asdf.com",
                "url": null
            })
            .then((response)=>{
                if(response.status === 201) { // 회원가입 성공
                    saveToken(response.data["token"])
                }
            })
            .catch((error)=>{
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
        if(response.status === 200) {

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
        location.href="/bookview"
    }).catch((error) => {
        console.log(error)
        console.log(error.response)
    })
}

let recordbook = () => {
    let textarea = document.getElementById("booksubstance").value;
    let bookview_booktitle = document.getElementById("booktitle").value;
    let bookview_startday = document.getElementById("startday").value;
    let bookview_endday = document.getElementById("endday").value;
    
    console.log("textarea" + (textarea != null));
     
    axios.post(SERVER_URL + "/books",
            {
                "text": textarea,
                "bookname": bookview_booktitle,
                "startDay": bookview_startday,
                "endDay": bookview_endday
            })
            .then((response)=>{
                if(response.status === 201) {
                    console.log(response)
                    console.log("booksave success");
                    location.href="/main"
                }
            })
            .catch((error)=>{
                console.log(error.response)
            });
        
}

window.onload = () => {
    let loginBtn = document.getElementById("login-btn");
    let signUpBtn = document.getElementById("signup-btn");
    let searchBtn = document.getElementById("book_search_btn");
    let storeBtn = document.getElementById("store-btn");

    //login 버튼을 눌렀을 시 login 함수 실행
    if(loginBtn != null)
        loginBtn.addEventListener("click", login);

    if(signUpBtn != null)
        signUpBtn.addEventListener("click", signUp);

    if(searchBtn != null)
        searchBtn.addEventListener("click", search);

    if(storeBtn != null)
        storeBtn.addEventListener("click", recordbook);


    let bookTitle_bookView = document.getElementById("booktitle")
    let bookImage_bookView = document.getElementById("bookimage")
    let bookInfo_title = localStorage.getItem("bookInfo_title")
    let bookInfo_image = localStorage.getItem("bookInfo_image")

    if(bookTitle_bookView != null) {
        if(bookImage_bookView != null) {
            if(bookInfo_title != null && bookInfo_image != null) {
                console.log(bookInfo_title)
                console.log(bookInfo_image)
                bookTitle_bookView.innerHTML = bookInfo_title
                bookImage_bookView.src = bookInfo_image
            }
        }
    }
}

// 토큰 저장(로그인 상태)
function saveToken(token) {
    localStorage.setItem("token", "Bearer " + token)

    // redirect to main page
    location.href="/main"
}