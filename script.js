const myLibrary = [];

function Book(name, author, numOfPages, hasRead, ID){
    // the constructor...
    this.name = name;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
    this.ID = ID;
}

// Prototype function for Book constructor that toggles read status of books
Book.prototype.toggleReadBookStatus = function(){
    console.log(`Book(${this.ID}) | Old read status: ${this.hasRead}`);
    this.hasRead = !(this.hasRead);
    console.log(`Book(this.ID) | New read status: ${this.hasRead}`);
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

        const uniqueID = `data-${book.ID}`; // Create data attribute of book's unique id
        bookClone.querySelector(".book-card").classList.add(uniqueID); // Add data attribute as a class

        // Set read status
        if (book.hasRead) {
            bookClone.querySelector(".hasReadBtn").textContent = "Yes";
            bookClone.querySelector(".hasReadBtn").style.backgroundColor = 'green';
        } else {
            bookClone.querySelector(".hasReadBtn").textContent = "No";
            bookClone.querySelector(".hasReadBtn").style.backgroundColor = 'red';
        }

        // Remove Book from library Method
        const closeBtn = bookClone.querySelector(".close-book");
        closeBtn.addEventListener("click", ()=>{
            const IDToBeDeleted = book.ID;

            const index = library.findIndex(book => book.ID === IDToBeDeleted); // Locate index of book with matchign ID
            if (index !== -1) {
                library.splice(index, 1); // Start from the index and delete one book
            }
            displayBooksToUsers(library);
            
        })

        // Toggle read status of book
        const toggleBtn = bookClone.querySelector(".hasReadBtn");
        toggleBtn.addEventListener("click", ()=>{
            book.toggleReadBookStatus();
            if(book.hasRead){
               toggleBtn.textContent = "Yes";
               toggleBtn.style.backgroundColor = 'green';
            }else{
                toggleBtn.textContent = "No";
                toggleBtn.style.backgroundColor = 'red';
            }
        })

        // Add the completed book card to the page
        mainSection.appendChild(bookClone);

    }



    console.table(library);
    
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
    libraryForm.reset(); // Reset form inputs to default (empty)

})

