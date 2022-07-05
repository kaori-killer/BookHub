let bar = document.getElementById("btn-submit");
bar.addEventListener("click", searchBook);

function searchBook(){
    let target = document.getElementById('search-bar');
    console.log(target);
    if(target.style.display == 'block') target.style.display = 'none';
    else if(target.style.display == 'none') target.style.display = 'block';
}