
const SERVER_URL = "http://localhost:8080"

window.onload = ()=>{
    axios.post(SERVER_URL + '/auth/me')
    .then((response)=>{
        alert(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });
}