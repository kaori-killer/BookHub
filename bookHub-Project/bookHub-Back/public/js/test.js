

window.onload = ()=>{
    axios.post('/auth/sibal')
    .then((response)=>{
        alert(response.data);
    })
    .catch((error)=>{
        console.log(error);
    });
}