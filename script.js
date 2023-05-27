const libraryModule = (() => {
    const addBtn = document.querySelector("#addBtn");
    const popUpForm = document.querySelector(".popUp");
    const newBookBtn = document.querySelector(".newBtn");
    const closePopUp = document.getElementsByTagName("span")[0];
    const library = document.querySelector("#library");
  
    let myLibrary = [];
    let newBook;
  
    function createBook(title, author, pages, read) {
      return {
        title,
        author,
        pages,
        read,
      };
    }
  
    function addBookToLibrary(event) {
      event.preventDefault();
      popUpForm.style.display = "none";
      document.querySelector(".title").style.display = "flex";
      document.querySelector(".newBtn").style.display = "flex";
  
      const title = document.querySelector("#title").value;
      const author = document.querySelector("#author").value;
      const pages = document.querySelector("#pages").value;
      const read = document.querySelector("#read").checked;
  
      if (title !== "" && author !== "" && pages !== "") {
        newBook = createBook(title, author, pages, read);
        myLibrary.push(newBook);
        library.style.display = "grid";
      } else {
        alert("Set a Value");
        library.style.display = "grid";
      }
  
      setData();
      renderBook();
      form.reset();
    }
  
    function renderBook() {
      clearBooks();
  
      myLibrary.forEach((item) => {
        createBookElement(item);
      });
    }
  
    function createBookElement(item) {
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      bookDiv.setAttribute("id", myLibrary.indexOf(item));
  
      const titleDiv = createDivElement("Title: " + item.title, "titleBook");
      const authorDiv = createDivElement("Author: " + item.author, "authorBook");
      const pageDiv = createDivElement("Pages: " + item.pages, "pagesBook");
      const readBtn = createButtonElement("Read", "readBtn");
      const removeBtn = createButtonElement("Remove", "removeBtn");
  
      bookDiv.appendChild(titleDiv);
      bookDiv.appendChild(authorDiv);
      bookDiv.appendChild(pageDiv);
      bookDiv.appendChild(readBtn);
      bookDiv.appendChild(removeBtn);
      library.appendChild(bookDiv);
  
      removeBtn.addEventListener("click", () => {
        myLibrary.splice(myLibrary.indexOf(item), 1);
        setData();
        renderBook();
      });
  
      readBtn.addEventListener("click", () => {
        item.read = !item.read;
        setData();
        renderBook();
      });
  
      if (item.read === false) {
        readBtn.textContent = "Not Read";
        readBtn.style.backgroundColor = "#f95959";
      } else {
        readBtn.textContent = "Read";
        readBtn.style.backgroundColor = "#e0ffcd";
      }
    }
  
    function clearBooks() {
      while (library.firstChild) {
        library.removeChild(library.firstChild);
      }
    }
  
    function createDivElement(textContent, className) {
      const div = document.createElement("div");
      div.textContent = textContent;
      div.classList.add(className);
      return div;
    }
  
    function createButtonElement(textContent, className) {
      const button = document.createElement("button");
      button.textContent = textContent;
      button.classList.add(className);
      return button;
    }
  
    function setData() {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
  
    function restore() {
      if (!localStorage.myLibrary) {
        renderBook();
      } else {
        const object = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary = object;
        renderBook();
      }
    }
  
    function init() {
      addBtn.addEventListener("click", addBookToLibrary);
  
      newBookBtn.addEventListener("click", () => {
        popUpForm.style.display = "flex";
        document.querySelector(".title").style.display = "none";
        document.querySelector(".newBtn").style.display = "none";
        library.style.display = "none";
      });
  
      closePopUp.addEventListener("click", () => {
        popUpForm.style.display = "none";
        document.querySelector(".title").style.display = "flex";
        document.querySelector(".newBtn").style.display = "flex";
        library.style.display = "grid";
      });
  
      restore();
    }
  
    return {
      init,
    };
  })();
  
  libraryModule.init();
  