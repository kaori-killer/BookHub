
const SERVER_URL = "http://localhost:8080"

window.onload = ()=>{
    axios.post(SERVER_URL + '/test')
    .then((response)=>{
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });
}