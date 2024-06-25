// declare empty array for storing books
const myLibrary = [];

// select screen elements
const showFormButton = document.querySelector('#show-form');
const addBookDialog = document.querySelector('#add-book-form');
const addBookButton = document.querySelector('#add-book')
const closeAddFormButton = document.querySelector('#close-form');
const bookForm = document.querySelector('#book-form')
const loadTestDataButton = document.querySelector('#load-test-data');

// shows modal
showFormButton.addEventListener('click', () =>{
    addBookDialog.showModal();
})

// close modal 
closeAddFormButton.addEventListener('click', () =>{
    event.preventDefault();
    addBookDialog.close();
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
addBookButton.addEventListener('click', () => {
    const bookTitleElement = addBookDialog.querySelector('#book-title');
    const bookAuthorElement = addBookDialog.querySelector('#book-author');
    const bookPagesElement = addBookDialog.querySelector('#book-pages');
    const yesReadStatus = addBookDialog.querySelector('#yes-indicator');
    const bookCover = addBookDialog.querySelector('#book-cover');

    const title = bookTitleElement.value;
    const author = bookAuthorElement.value;
    let pages = bookPagesElement.value;
    let cover = bookCover.value;
    
    if (pages === ''){
        pages = '??'
    }

    if (cover === ''){
        cover = '';
    }

    let readStatus = 'false';
    if (yesReadStatus.checked){
        readStatus = 'true';
    }
    
    addBookToLibrary(title, author, pages, readStatus, cover);
    bookForm.reset();
    addBookDialog.close();
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
    const capitalizedTitle = capitalizeEachWord(title);
    const capitalizedAuthor = capitalizeEachWord(author);
    let book = new Book(capitalizedTitle, capitalizedAuthor, pages, readStatus, cover);
    myLibrary.push(book)
}

// function to display library array into individual cards
function displayBooks(){
    const bookArea = document.querySelector(".book-area");
    bookArea.textContent = '';
    let i = 0;
    // loop over array
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        let read = false;
        card.classList.add("book-card");
        card.id = 'book-' + i++;
        bookArea.appendChild(card);
        // loop over book's property and add their content to html card
        for(let key in myLibrary){
            if (key === 'cover'){
                const cover = document.createElement('img');
                cover.classList.add('book-cover');
                cover.setAttribute('onerror', 'this.src="./covers/default-cover.jpg";')
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container')
                if (myLibrary[key] === ''){
                    cover.src = './covers/default-cover.jpg';
                } else {
                    cover.src = myLibrary[key];
                }
                imgContainer.appendChild(cover);
                card.appendChild(imgContainer);
            }else if (key === 'title'){
                const title = document.createElement('h2');
                title.textContent= myLibrary[key];
                title.classList.add('book-title')
                card.appendChild(title);
            } else if (key === 'author'){
                const author = document.createElement('p');
                author.textContent = myLibrary[key];
                author.classList.add('book-author');
                card.appendChild(author);
            } else if (key === 'pages'){
                const pages = document.createElement('p');
                pages.textContent = 'Total pages: ' + myLibrary[key];
                pages.classList.add('book-pages');
                card.appendChild(pages);
            } else if (key === 'readStatus'){
                const readStatus = document.createElement('p');
                readStatus.classList.add('read-status');
                if (myLibrary[key] === 'true'){
                    readStatus.textContent = 'Status: Read';
                    read = true;
                } else {
                    readStatus.textContent = 'Status: Not Read';
                }
                readStatus.classList.add('read-status')
                card.appendChild(readStatus);
            }
        }
        // add action buttons to each card
        appendCardButtons(card);
        const toggle = card.querySelector('.toggle-switch');
        const editButton = card.querySelector('.edit-button');
        const deleteButton = card.querySelector('.delete-button');

        if (read === true){
            toggle.checked = true;
        }

        // event listeners for the action buttons
        toggle.addEventListener('click', ()=>{
            const readStatus = card.querySelector('.read-status');
            if (toggle.checked === true){
                myLibrary['readStatus'] = 'true';
                readStatus.textContent = 'Status: Read';
            } else {
                myLibrary['readStatus'] = 'false';
                readStatus.textContent = 'Status: Not Read';
            }
        })

        editButton.addEventListener('click', () =>{
            const editBookDialog = document.createElement('dialog');
            card.appendChild(editBookDialog);
            editBookDialog.innerHTML += 
                '<form id="book-form">\
                <h2>Edit Book</h2>\
                <label for="book-title">Title:</label>\
                <input type="text" id="book-title" placeholder="The Hitchhiker`s Guide To The Galaxy" value="' + card.querySelector('.book-title').textContent + '" required>\
                <label for="book-author">Author:</label>\
                <input type="text" id="book-author" placeholder="Douglas Adams" value="' + card.querySelector('.book-author').textContent + '" required>\
                <label for="book-pages">Pages:</label>\
                <input type="number" id="book-pages" placeholder="42" min="1" value="' + card.querySelector('.book-pages').textContent.substring(13) + '" required>\
                <label for="book-cover">Cover:</label>\
                <input type="text" id="book-cover" value="' + card.querySelector('.book-cover').src + '" placeholder="URL goes here">\
                <div id="read-checkbox-container">\
                <span>Have you read this book?</span>\
                    <div>\
                        <input type="radio" name="read-status-radio" id="yes-indicator" value="true">\
                        <label for="yes-indicator">Yes</label>\
                        <input type="radio" name="read-status-radio" id="no-indicator" value="false" checked>\
                        <label for="no-indicator">Not yet</label>\
                    </div>\
                </div>\
                <div class="form-buttons">\
                    <button type="reset" id="clear-form">Clear</button>\
                    <button type="submit" formmethod="dialog" id="close-form">Cancel</button>\
                    <button type="submit" formmethod="dialog" id="edit-book">Edit book</button>\
                </div>\
            </form>';
        editBookDialog.showModal();
        
        const closeEditFormButton = editBookDialog.querySelector('#close-form');
        const editFormButton = editBookDialog.querySelector('#edit-book');
        
        closeEditFormButton.addEventListener('click', () => {
            event.preventDefault();
            editBookDialog.close();
        })        
        
        editFormButton.addEventListener('click', ()=> {
            const bookTitleElement = editBookDialog.querySelector('#book-title');
            const bookAuthorElement = editBookDialog.querySelector('#book-author');
            const bookPagesElement = editBookDialog.querySelector('#book-pages');
            const yesReadStatus = editBookDialog.querySelector('#yes-indicator');
            const bookCover = editBookDialog.querySelector('#book-cover');

            const editTitle = capitalizeEachWord(bookTitleElement.value);
            const editAuthor = capitalizeEachWord(bookAuthorElement.value);
            let editPages = bookPagesElement.value;
            let editCover = bookCover.value;
            
            if (editPages === ''){
                editPages = '??'
            }

            if (editCover === ''){
                editCover = '';
            }

            let editReadStatus = 'false';
            if (yesReadStatus.checked){
                editReadStatus = 'true';
            }
            
            const currentTitle = card.querySelector('.book-title');
            const currentAuthor = card.querySelector('.book-author');
            const currentPages = card.querySelector('.book-pages');
            const currentReadStatus = card.querySelector('.read-status');
            const currentCover = card.querySelector('.book-cover')

            currentTitle.textContent = editTitle;
            currentAuthor.textContent = editAuthor;
            currentPages.textContent = 'Total pages: ' + editPages;
            if (editReadStatus === 'true'){
                currentReadStatus.textContent = 'Status: Read';
                toggle.checked = true;
            } else {
                currentReadStatus.textContent = 'Status: Not Read';
                toggle.checked = false;
            }
            currentCover.src = editCover;

        })
        })


        deleteButton.addEventListener('click', (e) => {
            if (! confirm('Do you want to delete this book?')){
                e.preventDefault();
            } else {
                card.remove();
            }
        })
    })
}

// function to add buttons to each book card
function appendCardButtons(element){
    element.innerHTML +=    
        '<div class="book-buttons">\
            <label class="switch">\
                <input type="checkbox" class="toggle-switch">\
                <span class="slider round"></span>\
            </label>\
            <button class="edit-button">Edit</button>\
            <button class="delete-button">Delete</button>\
        </div>';
}

loadTestDataButton.addEventListener('click', () =>{
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "394", "false", '');
    addBookToLibrary('I, Robot', 'Isaac Asimov', '410', 'true','./covers/I, Robot.jpg');
    addBookToLibrary('Metro 2033', 'Dmitri Glukhovsky', '1130', 'true', './covers/metro2033.jpg');
    addBookToLibrary('Eragon', 'Christopher Paolini', '617', 'true', './covers/eragon.jpg');
    addBookToLibrary('Ender`s game', 'Orson Scott Card', '346', 'true', './covers/endersgame.jpg');
    addBookToLibrary('House of Cards', 'Michael dobbs', '401', 'false', './covers/houseofcards.jpg')
    addBookToLibrary('The Da Vinci Code', 'Dan Brown', '456', 'true', './covers/davincicode.jpg');
    addBookToLibrary('Novecento', 'Alessandro Baricco', '95', 'true', './covers/novecento.jpg');
    addBookToLibrary('Foundation', 'Isaac Asimov', '249', 'true', './covers/foundation.jpg');
    addBookToLibrary('It', 'Stephen King', '1123', 'false', '');
    displayBooks();
})
