
const SERVER_URL = "http://localhost:8080";

//id, password 보내는 함수
let login = () => {
    let userId = document.getElementById("username_login").value;
    let password = document.getElementById("password_login").value;

    axios
        .post(SERVER_URL + "/auth/login", {
            username: userId,
            password: password,
        })
        .then((response) => {
            saveToken(response.data["token"]);
        })
        .catch((error) => {
            alert(error.response.data["message"]);
        });
};

let signUp = () => {
    let userId = document.getElementById("username_signup").value;
    let password = document.getElementById("password_signup").value;
    let passwordCheck = document.getElementById("password_check_signup").value;
    let nickname = document.getElementById("nickname_signup").value;
    // let email = document.getElementById("email_signup").value

    if (password === passwordCheck) {
        axios.post(SERVER_URL + "/auth/signup", {
            email: userId,
            password: password,
            nickname: nickname
        })
            .then((response) => {
                if (response.status === 201) {
                    // 회원가입 성공
                    saveToken(response.data["token"]);
                }
            })
            .catch((error) => {
                alert(error.response.data["message"]);
            });
    } else {
        alert("비밀번호 확인 입력이 다릅니다.");
    }
};

// let getInfo = () => {
//     axios.get(SERVER_URL + "/auth/me", {
//         headers: {
//             Authorization: localStorage.getItem("token"),
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => {
//             console.log(response);
//             if (response.status === 200) {
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//             console.log(error.response);
//         });
// };

window.onload = () => {
    let loginBtn = document.getElementById("login-btn");
    let signUpBtn = document.getElementById("signup-btn");

    // login 버튼을 눌렀을 시 login 함수 실행
    if (loginBtn != null)
        loginBtn.addEventListener("click", login);

    if (signUpBtn != null)
        signUpBtn.addEventListener("click", signUp);
}

// 토큰 저장(로그인 상태)
function saveToken(token) {
    localStorage.setItem("token", "Bearer " + token);

    // redirect to main page
    location.href = "/main";
}