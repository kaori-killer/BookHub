
const SERVER_URL = "http://localhost:8080";


let search = () => {
    let search = document.getElementById("book_search_input").value;

    // console.log("search" + (search != null));

    axios.get(SERVER_URL + "/search?bookname=" + search)
        .then((response) => {
            // console.log(response);

            let bookInfo = response.data["items"][0];
            // console.log(bookInfo);

            localStorage.setItem("bookInfo_title", bookInfo["title"]);
            localStorage.setItem("bookInfo_image", bookInfo["image"]);
            localStorage.setItem("bookInfo_new", "new");
            location.href = "/new";
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });
};

// let updatecnt = () => {
//     axios.get(SERVER_URL + "/books")
//         .then((response) => {
//             console.log(response.status);
//             if (response.status === 200) {
//                 let totalCnt = response.data.length;
//                 // console.log("totalcnt" + totalCnt);
//                 // console.log(totalCnt);
//                 document.getElementById("readcount").innerHTML = totalCnt;
//             }
//         })
//         .catch((error) => {
//             console.log(error.response);
//         });
// };

let updateprogress = () => {
    axios.get(SERVER_URL + "/books")
        .then((response) => {
            // console.log(response.status);
            if (response.status === 200) {
                let totalCnt = response.data.length;
                // console.log("totalcnt" + totalCnt);

                let data = (totalCnt / 9) * 100;
                // console.log("data" + data)
                let progress = document.getElementById("progress-bar");
                let progresstext = document.getElementById("percent");

                progresstext.innerHTML = Math.floor(data) + "%";
                progress.style.width = data + "%";
            }
        })
        .catch((error) => {
            console.log(error.response);
        });
};

window.onload = () => {
    let searchBtn = document.getElementById("book_search_btn");

    // 찾기버튼 있으면 메인 페이지임
    if (searchBtn != null) {
        searchBtn.addEventListener("click", search);

        updateprogress();
    }

    // 책 로딩
    axios.get(SERVER_URL + "/books").then((responseBooks) => {
        let bookImages = document.getElementById("bookimage");

        if (responseBooks.status === 200) {
            let totalHTML = "";

            let totalCnt = responseBooks.data.length;

            for (let i = 0; i < totalCnt; i++) {
                let info = responseBooks.data[i];

                // open a div
                if (i % 3 === 0) {
                    totalHTML += '<div class="col mt-4">\n';
                }

                // add images
                totalHTML +=
                    '<a href="/bookview/' +
                    info.id +
                    '"><img class="imgsz" src="' +
                    info.imgUrl +
                    // '"../img/bookexample1.jpeg' +
                    '" alt="../img/gray.png"/></a>\n';

                // close a div
                if (i % 3 === 2) {
                    totalHTML += "</div>\n";
                }
            }

            let remainCnt = totalCnt - Math.floor(totalCnt / 3) * 3;
            let remainCntFinish = Math.ceil(remainCnt / 3) * 3;

            // 최소 9칸 띄우기 보장
            if(totalCnt === 0) remainCntFinish += 3;
            if(totalCnt <= 3) remainCntFinish += 3;
            if (totalCnt <= 6) remainCntFinish += 3;

            for (let i = remainCnt; i < remainCntFinish; i++) {
                // open a div
                if (i % 3 === 0) {
                    totalHTML += '<div class="col mt-4">\n';
                }

                // add blank images
                totalHTML +=
                    '<img class="imgsz" src=' + '' + '"../../img/gray.png" alt="gray">\n';

                // close a div
                if (i % 3 === 2) {
                    totalHTML += "</div>\n";
                }
            }

            // 마지막 \n 제거
            totalHTML = totalHTML.substring(0, totalHTML.length - 1)

            bookImages.innerHTML = totalHTML;
        }
    });

    // if (readcnt != null) updatecnt();
};