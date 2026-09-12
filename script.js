const myLibrary = [];

function Book(name, author, numOfPages, hasRead, ID) {
  // the constructor...
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.hasRead = hasRead;
  this.ID = ID;
}

// Prototype function for Book constructor that toggles read status of books
Book.prototype.toggleReadBookStatus = function () {
  console.log(`Book(${this.ID}) | Old read status: ${this.hasRead}`);
  this.hasRead = !this.hasRead;
  console.log(`Book(this.ID) | New read status: ${this.hasRead}`);
};

function addBookToLibrary(name, author, numOfPages, hasRead) {
  // take params, create a book then store it in the array
  const ID = crypto.randomUUID();
  const newBook = new Book(name, author, numOfPages, hasRead, ID);
  myLibrary.push(newBook);
}

function displayBooksToUsers(library) {
  const mainSection = document.getElementById("main-section");
  const bookTemplate = document.querySelector(".book-display");

  // Remove all previously displayed books
  mainSection.replaceChildren();

  for (const book of library) {
    // Clone the entire template
    const bookClone = bookTemplate.content.cloneNode(true);

    // Change the cloned content
    bookClone.querySelector(".bookTitle").textContent =
      `Book Title: ${book.name}`;
    bookClone.querySelector(".bookAuthor").textContent =
      `Author: ${book.author}`;
    bookClone.querySelector(".numPages").textContent =
      `Number of pages: ${book.numOfPages}`;

    const uniqueID = `data-${book.ID}`; // Create data attribute of book's unique id
    bookClone.querySelector(".book-card").classList.add(uniqueID); // Add data attribute as a class

    // Set read status
    if (book.hasRead) {
      bookClone.querySelector(".hasReadBtn").textContent = "Yes";
      bookClone.querySelector(".hasReadBtn").style.backgroundColor = "green";
    } else {
      bookClone.querySelector(".hasReadBtn").textContent = "No";
      bookClone.querySelector(".hasReadBtn").style.backgroundColor = "red";
    }

    // Remove Book from library Method
    const closeBtn = bookClone.querySelector(".close-book");
    closeBtn.addEventListener("click", () => {
      const IDToBeDeleted = book.ID;

      const index = library.findIndex((book) => book.ID === IDToBeDeleted); // Locate index of book with matchign ID
      if (index !== -1) {
        library.splice(index, 1); // Start from the index and delete one book
      }
      displayBooksToUsers(library);
    });

    // Toggle read status of book
    const toggleBtn = bookClone.querySelector(".hasReadBtn");
    toggleBtn.addEventListener("click", () => {
      book.toggleReadBookStatus();
      if (book.hasRead) {
        toggleBtn.textContent = "Yes";
        toggleBtn.style.backgroundColor = "green";
      } else {
        toggleBtn.textContent = "No";
        toggleBtn.style.backgroundColor = "red";
      }
    });

    // Add the completed book card to the page
    mainSection.appendChild(bookClone);
  }

  console.table(library);
}

// Open the form for adding a book to the library
const modal = document.querySelector("#book-creation"); // Reference to the dialog element for libraryaddition
const newBookBtn = document.querySelector(".btn"); // Reference to "Add a new Book" button
newBookBtn.addEventListener("click", () => {
  modal.showModal();
});

// Close the form for adding a book to the library
const closeModal = document.querySelector(".close-window"); // Reference to the close window button in the dialog element
closeModal.addEventListener("click", () => {
  modal.close();
});

// Adding a new book to the library
const libraryForm = document.getElementById("library-form"); // Reference to the form for adding a new book to the library
libraryForm.addEventListener("submit", (event) => {
  if (!bookName.validity.valid) {
    showBookNameError();
    event.preventDefault();
  } else if (!authorName.validity.valid) {
    showAuthorNameError();
    event.preventDefault();
  } else if (!pageNumber.validity.valid) {
    showPageNumberError();
    event.preventDefault();
  } else {
    const bookName = libraryForm.elements.bookName.value;
    const author = libraryForm.elements.author.value;
    const numOfPages = libraryForm.elements.numOfPages.value;
    const hasRead = libraryForm.elements.hasRead.checked;

    addBookToLibrary(bookName, author, numOfPages, hasRead);

    modal.close();
    displayBooksToUsers(myLibrary);
    libraryForm.reset(); // Reset form inputs to default (empty)
    event.preventDefault();
  }
});

/*
 * Library Book Form Validation
 */

// Book Name Validation & Error Messaging
const bookName = document.getElementById("bname");
const bookNameError = document.querySelector("#bname + span.error");

bookName.addEventListener("input", checkBookNameValidaton);

function checkBookNameValidaton() {
  console.log(`The book name being valid is ${bookName.validity.valid}`);
  bookName.setCustomValidity("");
  if (bookName.validity.valid) {
    bookNameError.textContent = "";
    bookNameError.className = "error";
  } else {
    showBookNameError();
  }
}

function showBookNameError() {
  if (bookName.validity.valueMissing) {
    bookNameError.textContent = "You need to enter a book name!";
    bookName.setCustomValidity("You need to enter a book name!");
  } else if (bookName.validity.tooLarge) {
    bookNameError.textContent = "The book name is too long!";
    bookName.setCustomValidity("The book name is too long!");
  }
  bookNameError.className = "error active";
}

// Author Name Validation & Error Messaging
const authorName = document.getElementById("aname");
const authorNameError = document.querySelector("#aname + span.error");

authorName.addEventListener("input", checkAuthorNameValidation);

function checkAuthorNameValidation() {
  authorName.setCustomValidity("");
  if (authorName.validity.valid) {
    authorNameError.textContent = "";
    authorNameError.className = "error";
  } else {
    showAuthorNameError();
  }
}

function showAuthorNameError() {
  if (authorName.validity.valueMissing) {
    authorNameError.textContent = "You need to enter an author name!";
    authorName.setCustomValidity("You need to enter an author name!");
  } else if (authorName.validity.tooLarge) {
    authorNameError.textContent = "The author name is too large!";
    authorName.setCustomValidity("The author name is too large!");
  }
  authorNameError.className = "error active";
}

// Number of Pages Validation & Error Messaging
const pageNumber = document.getElementById("nopages");
const pageNumberError = document.querySelector("#nopages + span.error");

pageNumber.addEventListener("input", checkPageNumberValidation);

function checkPageNumberValidation() {
  pageNumber.setCustomValidity("");

  if (pageNumber.validity.valid) {
    pageNumberError.textContent = "";
    pageNumberError.className = "error";
  } else {
    showPageNumberError();
  }
}

function showPageNumberError() {
  if (pageNumber.validity.valueMissing) {
    pageNumberError.textContent =
      "You need to enter the total number of pages!";
    pageNumber.setCustomValidity(
      "You need to enter the total number of pages!",
    );
  } else if (pageNumber.validity.rangeOverflow) {
    pageNumberError.textContent = "The total number of pages is too large!";
    pageNumber.setCustomValidity("The total number of pages is too large!");
  }
  pageNumberError.className = "error active";
}
