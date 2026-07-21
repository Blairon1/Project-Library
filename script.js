const myLibrary = [];

function Book(name, author, numOfPages, hasRead, ID){
    // the constructor...
    this.name = name;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
    this.ID = ID;

}


function addBookToLibrary(name, author, numOfPages, hasRead){
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
        bookClone.querySelector(".bookTitle").textContent = `Book Title: ${book.name}`;
        bookClone.querySelector(".bookAuthor").textContent = `Author: ${book.author}`;
        bookClone.querySelector(".numPages").textContent = `Number of pages: ${book.numOfPages}`;

        // Set read status
        if (book.hasRead) {
            bookClone.querySelector(".hasReadBtn").textContent = "Yes";
        } else {
            bookClone.querySelector(".hasReadBtn").textContent = "No";
        }

        // Add the completed book card to the page
        mainSection.appendChild(bookClone);
    }

    console.table(library);
}

function removeBookFromLibrary(){

}

function toggleReadBookStatus(){

}



// Open the form for adding a book to the library
const modal = document.querySelector('#book-creation'); // Reference to the dialog element for libraryaddition
const newBookBtn = document.querySelector('.btn'); // Reference to "Add a new Book" button
newBookBtn.addEventListener('click', ()=>{
    modal.showModal();
})

// Close the form for adding a book to the library
const closeModal = document.querySelector('.close-window'); // Reference to the close window button in the dialog element
closeModal.addEventListener('click', ()=>{
    modal.close();
})


// Adding a new book to the library
const libraryForm = document.getElementById('library-form'); // Reference to the form for adding a new book to the library
libraryForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const bookName = libraryForm.elements.bookName.value;
    const author = libraryForm.elements.author.value;
    const numOfPages = libraryForm.elements.numOfPages.value;
    const hasRead = libraryForm.elements.hasRead.checked;

    addBookToLibrary(bookName,author,numOfPages,hasRead);

    modal.close();
    displayBooksToUsers(myLibrary);
    libraryForm.reset();

})










addBookToLibrary("Harry Potter","JK Rowling",500,true);
addBookToLibrary("1984","George Orwell",328,false);
addBookToLibrary("To Kill A Mockingbird","Harper Lee",280,true);
addBookToLibrary("Moby-Dick","Herman Melville",625,false);
displayBooksToUsers(myLibrary);
