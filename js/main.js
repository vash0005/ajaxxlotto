document.addEventListener("DOMContentLoaded", init);


let httpRequest = "POST";


function init() {



    document.getElementById("buttonSend").addEventListener("click", getData);

    document.getElementById("buttonBack").addEventListener("click", BackButton);


}


function getData() {

    let digits = document.getElementById("digits").value;

    let max = document.getElementById("max").value;

    let customSettings = {
        method: httpRequest,
        mode: "cors"
    };

    let url = "https://davidst.edumedia.ca/mad9014/nums.php?digits=" + digits + "&max=" + max;

    let request = new Request(url, customSettings);

    let errorMsg = document.getElementById("errorMessage");

    fetch(request)

        .then(function (data) {
            console.log(data);
            errorMsg.innerHTML = "";
            errorMsg.style.display = "none";
            return data.json();
        })

        .then(function (data) {
            console.log(data);

            let ul = document.querySelector(".num_list");


            ul.innerHTML = "";

            if (data.code == "0") {
                for (let item in data.numbers) {
                    let li = document.createElement("li");
                    li.innerHTML = data.numbers[item];
                    ul.appendChild(li);
                }

                Navigate(1);
            } else if (data.code == "522" || data.code == "534") {
                errorMsg.style.display="block";
                errorMsg.innerHTML = "You are requested to enter a valid range!";
                Navigate(1);
            }
        })
        .catch(function (error) {
            alert("Error: " + error.message);
        });
}



function Navigate(page) {

    let pages = document.querySelectorAll(".page");

    for (let i = 0; i < pages.length; i++) {

        if (page == i) {
            pages[i].classList.add("active");
        } else {
            pages[i].classList.remove("active");
        }
    }
}


function BackButton() {
    Navigate(0);
    document.getElementById("digits").value = "";
    document.getElementById("max").value = "";
}
