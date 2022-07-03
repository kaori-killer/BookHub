let loginbtn = document.getElementById("login-btn");
let gosignup = document.getElementById("go-signup");
let userid = document.getElementById("username_login");
let userpw = document.getElementById("password_login");

const SERVER_URL = "http://localhost:8080"

//id, password 보내는 함수
let loginPost = () => {
    let id = userid.value;
    let pw = userpw.value;

    axios.post(SERVER_URL+"/auth/login",{"id":id, "password":pw})
    .then((response)=>{
        console.log(response);
        alert(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });
}

//signup a태그를 누를시 signup.html로 이동
// let Gosign = (app) => {
//     app.get("/", (req, res) => {
//         res.render("signup.html");
//     });
// }

window.onload = () => {
    //login 버튼을 눌렀을 시 loginPost 함수 실행
    loginbtn.addEventListener("click", loginPost);
    // gosignup.addEventListener("click", Gosign);
}

// module.exports = Gosign;