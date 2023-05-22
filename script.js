const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addBookToLibrary);

const popUpForm = document.querySelector(".popUp");

const newBookBtn = document.querySelector(".newBtn");
newBookBtn.addEventListener("click", () => {
    popUpForm.style.display = "flex";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".newBtn").style.display = "none";
    document.querySelector("#library").style.display = "none";
});

const closePopUp = document.getElementsByTagName("span")[0];
closePopUp.addEventListener("click", () => {
    popUpForm.style.display = "none";
    document.querySelector(".title").style.display = "flex";
    document.querySelector(".newBtn").style.display = "flex";
    document.querySelector("#library").style.display = "grid";
});

let myLibrary = [];
let newBook;

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author; 
        this.pages = pages; 
        this.read = read;
    }
}

function addBookToLibrary() {
    event.preventDefault();
    popUpForm.style.display = "none";
    document.querySelector(".title").style.display = "flex";
    document.querySelector(".newBtn").style.display = "flex";

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;

    if (title !== "" && author !== "" && pages !== "") {
        newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
        document.querySelector("#library").style.display = "grid";
    } else {
        alert("Set a Value");
        document.querySelector("#library").style.display = "grid";
    }

    setData();
    renderBook();
    form.reset();
}

function renderBook() {
    const display = document.querySelector("#library");
    const books = document.querySelectorAll(".book");
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

function createBook(item) {
    const library = document.querySelector("#library");
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = "Title: " + item.title;
    titleDiv.classList.add('titleBook');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = "Author: " + item.author;
    authorDiv.classList.add('authorBook');
    bookDiv.appendChild(authorDiv);

    pageDiv.textContent = "Pages: " + item.pages;
    pageDiv.classList.add('pagesBook');
    bookDiv.appendChild(pageDiv);

    readBtn.classList.add('readBtn')    
    bookDiv.appendChild(readBtn);

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.appendChild(removeBtn);

    library.appendChild(bookDiv);

    removeBtn.addEventListener("click", () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        renderBook();
    })

    readBtn.addEventListener("click", () => {
        item.read = !item.read;
        setData();
        renderBook();
    })

    if (item.read === false) {
        readBtn.textContent = "Not Read";
        readBtn.style.backgroundColor = "#f95959";
    } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "#e0ffcd";
    }
}

function setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restore() {
    if (!localStorage.myLibrary) {
        renderBook();
    } else {
        let object = localStorage.getItem("myLibrary");
        object = JSON.parse(object);
        myLibrary = object;
        renderBook();
    }
}

restore();
