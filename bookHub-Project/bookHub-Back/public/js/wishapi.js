const SERVER_URL = "http://localhost:8080"

let createWish = async () => {
    let bookname = document.getElementById("wishlist_input").value
    let responseBook = await axios.get(SERVER_URL + "/search?bookname=" + bookname)

    console.log(responseBook)

    let url = responseBook.data["items"][0].image

    console.log(responseBook.data["items"][0])
    console.log(url)

    axios.post(SERVER_URL + "/wishs", {
        "bookname": bookname,
        "imgUrl": url,
    }).then((response) => {
        location.reload()
    })
}

window.onload = async () => {

    let wishBtn = document.getElementById("wishlist_search")

    if (wishBtn != null)
        wishBtn.addEventListener("click", createWish);

    if (location.href.endsWith("wishList")) { // load wishs
        let responseBooks = await axios.get(SERVER_URL + "/wishs");
        let bookImages = document.getElementById("bookimage_wishs");

        // let totalCnt = response.data["data"].length
        console.log(responseBooks);

        console.log(responseBooks.status);
        if (responseBooks.status === 200) {
            let totalHTML = "";

            // let totalCnt = Math.max(response.data.length, 9)
            let totalCnt = responseBooks.data.length;
            console.log("totalcnt" + totalCnt);

            for (let i = 0; i < totalCnt; i++) {
                let info = responseBooks.data[i];

                // open a div
                if (i % 3 === 0) {
                    totalHTML += '<div class="col mt-4">\n';
                }

                console.log(info)

                // let responseBookInfo = await axios.get(SERVER_URL + "/search?bookname=" + info.bookname);
                // console.log(responseBookInfo.data);
                // console.log(responseBookInfo.data.imgUrl);

                // add images
                totalHTML +=
                    // '<a href="/bookview/' +
                    // info.id +
                    // '">' +
                    '<img class="imgsz" src="' +
                    info.imgUrl +
                    // '"../img/bookexample1.jpeg' +
                    '" alt="../img/gray.png"/>' //+
                // '</a>'
                ;

                // close a div
                if (i % 3 === 2) {
                    totalHTML += "</div>";
                }
            }

            // let estimatedCnt = Math.max(totalCnt, 9)
            let remainCnt = totalCnt - Math.floor(totalCnt / 3) * 3;
            let remainCntFinish = Math.ceil(remainCnt / 3) * 3;

            // 최소 9칸 띄우기 보장
            if (totalCnt <= 3) remainCntFinish += 3;
            if (totalCnt <= 6) remainCntFinish += 3;

            console.log("reaminCnt " + remainCnt);
            console.log("reaminCntFinish " + remainCntFinish);
            for (let i = remainCnt; i < remainCntFinish; i++) {
                // open a div
                if (i % 3 === 0) {
                    totalHTML += '<div class="col mt-4">\n';
                }

                // add blank images
                totalHTML +=
                    '<img class="imgsz" src=' + '"../img/gray.png' + '" alt="gray">';
                // close a div
                if (i % 3 === 2) {
                    totalHTML += "</div>";
                }
            }

            console.log(totalHTML);
            console.log(totalCnt);

            bookImages.innerHTML = totalHTML;
        }
    }
}