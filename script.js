// declare empty array for storing books
const myLibrary = [];

// select screen elements
const showFormButton = document.querySelector('#show-form');
const dialog = document.querySelector('#add-book-form');
const addBookButton = document.querySelector('#add-book')
const closeFormButton = document.querySelector('#close-form');
const bookForm = document.querySelector('#book-form')

// shows modal
showFormButton.addEventListener('click', () =>{
    dialog.showModal();
})

// close modal 
closeFormButton.addEventListener('click', () =>{
    event.preventDefault();
    dialog.close();
})

// function to capitalize the first letter of each word
function capitalizeEachWord (string){
    words = string.split(' ');
    for (let i = 0; i < words.length; i++){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
}

// add book to library array and display them on screen
addBookButton.addEventListener('click', () =>{
    const bookTitleElement = document.querySelector('#book-title');
    const bookAuthorElement = document.querySelector('#book-author');
    const bookPagesElement = document.querySelector('#book-pages');
    const yesReadStatus = document.querySelector('#yes-indicator');

    const title = capitalizeEachWord(bookTitleElement.value);
    const author = capitalizeEachWord(bookAuthorElement.value);
    let pages = bookPagesElement.value;
    
    if (pages === ''){
        pages = '??'
    }
    let readStatus = false;
    if (yesReadStatus.checked){
        readStatus = true;
    }
    
    console.log(title, author, pages ,readStatus);
    addBookToLibrary(title, author, pages, readStatus);
    bookForm.reset();
    dialog.close();
    displayBooks();
})

// Object Constructor for books
function Book(title, author, pages, readStatus, cover){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.cover = cover;
    // this.info = function(){
    //     let infoString = (title + ' by ' + author + ', ' +  pages + ' pages,' + readStatus);
    //     return infoString;
    // }
}

// function to add new books to myLibrary array
function addBookToLibrary(title, author, pages, readStatus, cover) {
    let book = new Book(title, author, pages, readStatus, cover);
    myLibrary.push(book)
}

// function to display library array into individual cards
function displayBooks(){
    const bookArea = document.querySelector(".book-area");
    bookArea.textContent = '';
    // loop over array
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        bookArea.appendChild(card);
        // loop over book's property and add their content to html card
        for(let key in myLibrary){
            if (key === 'cover'){
                console.log("I see a cover property")
                const cover = document.createElement('img');
                if (myLibrary[key] === ''){
                    cover.src = './covers/default-cover.jpg';
                    console.log("hi")
                } else {
                    cover.src = myLibrary[key];
                }
                card.appendChild(cover);
            }else if (key === 'title'){
                const title = document.createElement('h2');
                title.textContent= myLibrary[key];
                card.appendChild(title);
            } else if (key === 'author'){
                const author = document.createElement('p');
                author.textContent = myLibrary[key];
                card.appendChild(author);
            } else if (key === 'pages'){
                const pages = document.createElement('p');
                pages.textContent = 'Total pages: ' + myLibrary[key];
                card.appendChild(pages);
            } else if (key === 'readStatus'){
                const readStatus = document.createElement('p');
                readStatus.textContent = myLibrary[key];
                card.appendChild(readStatus);
            }
        }
        appendCardButtons(card);

    })
}

// function to add buttons to each book card
function appendCardButtons(element){
    element.innerHTML +=    
        '<div>\
            <label class="switch">\
                <input type="checkbox">\
                <span class="slider round"></span>\
            </label>\
            <button>Edit</button>\
            <button>Delete</button>\
        </div>';
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "394", "false", '');
addBookToLibrary('I, Robot', 'Isaac Asimov', '410', 'true','./covers/I, Robot.jpg');
displayBooks();