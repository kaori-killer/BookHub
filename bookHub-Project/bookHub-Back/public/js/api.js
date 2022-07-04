
let gosignup = document.getElementById("go-signup");


const SERVER_URL = "http://localhost:8080"

//id, password 보내는 함수
let login = () => {
    // let axios = require('axios');
    let userid = document.getElementById("username_login");
    let userPassword = document.getElementById("password_login");

    let id = userid.value;
    let pw = userPassword.value;

    axios.post(SERVER_URL + "/auth/login",
        {
            "username":id,
            "password":pw
        })
        .then((response)=>{
            console.log(response);

            let token = response.data["token"]
            localStorage.setItem("token", "bearer " + token)

            // redirect to main page
            location.href="/"
        })
        .catch((error)=>{
            console.log(error);
            alert(error.response.data["message"])
        });
}

let signUp = () => {
    let userId = document.getElementById("username_signup").value
    let password = document.getElementById("password_signup").value
    let passwordCheck = document.getElementById("password_check_signup").value
    let nickname = document.getElementById("nickname_signup").value
    let email = document.getElementById("email_signup").value

    if(password === passwordCheck) {
        axios.post(SERVER_URL + "/auth/signup",
            {
                "username": userId,
                "password": password,
                "name": nickname,
                "email": email,
                "url": null
            })
            .then((response)=>{
                console.log(response);

                if(response.status === 201) { // 회원가입 성공
                    let token = response.data["token"] // 토큰 저장(로그인 상태)
                    localStorage.setItem("token", "bearer " + token)

                    // redirect to main page
                    location.href="/"
                }
            })
            .catch((error)=>{
                console.log(error);
                alert(error.response.data["message"])
            });
    } else {
        alert("비밀번호 확인 입력이 다릅니다.")
    }
}

//signup a태그를 누를시 signup.html로 이동
// let Gosign = (app) => {
//     app.get("/", (req, res) => {
//         res.render("signup.html");
//     });
// }

window.onload = () => {
    let loginBtn = document.getElementById("login-btn");
    let signUpBtn = document.getElementById("signup-btn");

    //login 버튼을 눌렀을 시 login 함수 실행
    if(loginBtn != null)
        loginBtn.addEventListener("click", login);

    if(signUpBtn != null)
        signUpBtn.addEventListener("click", signUp);
}

// module.exports = Gosign;