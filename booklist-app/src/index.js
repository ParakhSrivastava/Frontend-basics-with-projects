// Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handles UI tasks
class UI {
  // method to add books to list in table
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  // method that will add book one by one
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.append(row);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    // adding text in between div
    div.append(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    // inserting div before form and after container
    container.insertBefore(div, form);

    // make vanish it after 1.5 sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }

  static removeBook(element) {
    if (element.classList.contains("delete")) {
      element.parentElement.parentElement.remove();
    }
  }
}

// Store Class: Handles storage (local)
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    let books = Store.getBooks();
    books = books.filter((book) => book.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Displays books
// DOMContentLoaded: this will make mehtod call as soon as DOM loads
document.addEventListener("DOMContentLoaded", UI.displayBooks());

// Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevents actual submit
  e.preventDefault();

  // getting form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validation
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all the fields!!!", "danger");
  } else {
    // creating new instance of book
    const newBook = new Book(title, author, isbn);

    // adding book to list
    UI.addBookToList(newBook);

    // add to Store
    Store.addBook(newBook);

    // show alert
    UI.showAlert("Book Added Successfully", "success");

    // clear fields
    UI.clearFields();
  }
});

// Event: Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.removeBook(e.target);

  // remove book from Store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // show alert
  UI.showAlert("Book Removed Successfully", "success");
});
