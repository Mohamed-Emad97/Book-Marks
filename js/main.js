//Global Variables 
var bookMarkName = document.querySelector("#bookmark-name");
var bookMarkUrl = document.querySelector("#bookmark-url");
var newAdd = document.querySelector("#btn");
var search = document.querySelector("#search");
var tableBady = document.querySelector("#display");
var inputs = document.querySelectorAll("input");
var alert = document.querySelectorAll(".error");
var form = document.querySelector(".form");
var namePattern = /^[A-Z][-a-zA-Z]+$/;
var urlPattern = /^(https)?(:\/\/)?\w{3}.?\w+.(com|org|net)(:\d+\/\w+.\w+\?\w+=\d+&\w+=\w+)?$/;
var currentIndex = 0;


var bookMarks = [];

//getItemsFromLocalStorage
if(JSON.parse(localStorage.getItem("url")) != null) {
    bookMarks = JSON.parse(localStorage.getItem("url"));
    displayBookmarks();
}



//Calling Events
//btn Event
newAdd.addEventListener("click", function(e){

    if(bookMarkName.value == "" && bookMarkUrl.value == ""){
        for(var i =0; i < alert.length; i++) {
            alert[i].classList.remove("d-none");
            alert[i].classList.add("d-block");
        }
        
    } else {
        for(var i =0; i < alert.length; i++) {
            alert[i].classList.remove("d-block");
            alert[i].classList.add("d-none");
        }
        if(newAdd.innerHTML == "Submit") { //Add Mode
            addBookMark();       
        } else { //Update Mode
            update();
        }
        displayBookmarks();
        resetData();
    }
})

//search event
search.addEventListener("keyup", function() {
    var searchTxt = search.value;
    var element =``;
    for(var i = 0; i < bookMarks.length; i++) {
        if(bookMarks[i].name.toLowerCase().includes(searchTxt.toLowerCase())){ //Lower Or Upper Is The Same 
            element += `
            <tr>
                <td>${bookMarks[i].name}</td>
                <td>${bookMarks[i].url}</td>
                <td>
                    <a href="" class="link btn btn-main rounded-pill" onclick="visit(${i})">Visit</a>
                    <button class="btn btn-main rounded-pill" onclick="getInfo(${i})">Update</button>
                    <button class="btn btn-main rounded-pill" onclick="deleteBookmark(${i})">Delete</button>
                </td>
            </tr>
            `
        }
    }
        tableBady.innerHTML = element;
})
//inputsValidation
bookMarkName.addEventListener("keyup",validation);

bookMarkUrl.addEventListener("keyup", validation);

bookMarkName.addEventListener("keyup",nameChecking);

bookMarkUrl.addEventListener("keyup",urlChecking);
//Program Functions
function addBookMark() {
    var bookMark = {
        name: bookMarkName.value,
        url: bookMarkUrl.value,
    }

    bookMarks.push(bookMark);
    localStorage.setItem("url",JSON.stringify(bookMarks));
}

function displayBookmarks() {
    var element =``;
    for(var i = 0; i < bookMarks.length; i++) {
        element += `
        <tr>
            <td>${bookMarks[i].name}</td>
            <td>${bookMarks[i].url}</td>
            <td>
                <a href=""  onclick="visit(${i})" class="link btn btn-main rounded-pill">Visit</a>
                <button class="btn btn-main rounded-pill" onclick="getInfo(${i})">Update</button>
                <button class="btn btn-main rounded-pill" onclick="deleteBookmark(${i})">Delete</button>
            </td>
        </tr>
        `
    }
    tableBady.innerHTML = element;
}

function resetData () {
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].value = ``;
    }
}

function deleteBookmark(index) {
    bookMarks.splice(index,1);
    displayBookmarks();
    localStorage.setItem("url",JSON.stringify(bookMarks));
}

function getInfo(index) {
    currentIndex = index;
    var bookMarkInfo = bookMarks[index];
    bookMarkName.value = bookMarkInfo.name;
    bookMarkUrl.value = bookMarkInfo.url;
    newAdd.innerHTML = "Update Link";
}

function update() {
    var updateBookMark = {
        name: bookMarkName.value,
        url: bookMarkUrl.value,
    }
    bookMarks[currentIndex] = updateBookMark;
    localStorage.setItem("url",JSON.stringify(bookMarks));
    newAdd.innerHTML="Submit";
}

function urlChecking() {
    if(urlPattern.test(bookMarkUrl.value)) {
        bookMarkUrl.classList.add("is-valid");
        bookMarkUrl.classList.remove("is-invalid");
        return true;
    } else {
        bookMarkUrl.classList.remove("is-valid");
        bookMarkUrl.classList.add("is-invalid");
        return false;
    }
}

function nameChecking() {
    if(namePattern.test(bookMarkName.value)) {
        bookMarkName.classList.add("is-valid");
        bookMarkName.classList.remove("is-invalid");
        return true;
    } else {
        bookMarkName.classList.remove("is-valid");
        bookMarkName.classList.add("is-invalid");
        return false;
    }
}

function validation() {
    if(urlChecking && nameChecking) {
        newAdd.removeAttribute("disabled");
        return true;
    } else {
        newAdd.disabled = "true";
        return false;
    }
}

function visit(index) {
    var links = document.querySelectorAll(".link");
    for(var i=0;i < links.length; i++) {
        if(bookMarks[index].url.includes("https://")){
            links[i].setAttribute("href", `${bookMarks[index].url}`);
        }else {
            links[i].setAttribute("href", `https://${bookMarks[index].url}`);
        }
        links[i].setAttribute("target", "_blank");
    }
}