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

function displayBooksToUsers(library){
    console.table(library);
}

function removeBookFromLibrary(){

}

function toggleReadBookStatus(){

}



const newBookBtn = document.querySelector('.btn');

const modal = document.querySelector('#book-creation');
const closeModal = document.querySelector('.close-window');
const submitBook = document.querySelector('.submit-book');

newBookBtn.addEventListener('click', ()=>{
    modal.showModal();
})

closeModal.addEventListener('click', ()=>{
    modal.close();
})







/*
addBookToLibrary("Harry Potter","JK Rowling",500,true);
addBookToLibrary("1984","George Orwell",328,false);
addBookToLibrary("To Kill A Mockingbird","Harper Lee",280,true);
addBookToLibrary("Moby-Dick","Herman Melville",625,false);
displayBooksToUsers(myLibrary);
*/