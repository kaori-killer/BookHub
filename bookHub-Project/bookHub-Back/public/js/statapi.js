
const SERVER_URL = "http://localhost:8080"

window.onload = () => {
    axios.get(SERVER_URL + "/statistics").then((response) => {
        let completeCnt =  response.data["completeCnt"]
        let totalCnt =  response.data["totalCnt"]
        let percentage =  response.data["percentage"]

        document.getElementById("readcount").innerHTML = completeCnt
        document.getElementById("totalcount").innerHTML = totalCnt
    });
}