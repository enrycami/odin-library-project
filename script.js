const myLibrary = [];
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "394", "false")


function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function(){
        let infoString = (title + ' by ' + author + ', ' +  pages + ' pages,' + readStatus);
        return infoString;
    }
}

function addBookToLibrary(title, author, pages, readStatus) {
    let book = new Book(title, author, pages, readStatus);
    myLibrary.push(book)
}
