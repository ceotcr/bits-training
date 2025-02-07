const bookLibrary = {
    books: [],
    addBook: function (book) {
        this.books.push(book);
    },
    getBooksByAuthor: function (author) {
        return this.books.filter(book => book.author === author);
    },
    removeBook: function (title) {
        this.books = this.books.filter(book => book.title !== title);
    },
    getAllBooks: function () {
        return this.books.map(book => book.title);
    }
};

bookLibrary.addBook({ title: '3 Days of Happiness', author: 'Sugaru Miaki', yearPublished: 2013 });

bookLibrary.addBook({ title: 'A song of Ice and Fire', author: 'George R. R. Martin', yearPublished: 1996 });

bookLibrary.addBook({ title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", yearPublished: 2000 });

console.log(
    '\nAll books:\n',
    bookLibrary.getAllBooks()
);

console.log("\nAdd book 'Harry Potter and the Order of the Phoenix' by J.K. Rowling\n");

bookLibrary.addBook({ title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling", yearPublished: 2003 });

console.log(
    '\nAll books after adding "Harry Potter and the Order of the Phoenix":\n',
    bookLibrary.getAllBooks()
);

console.log(
    '\nBooks by J.K. Rowling:\n',
    bookLibrary.getBooksByAuthor('J.K. Rowling')
);

console.log("\nRemove book 'A song of Ice and Fire'\n");
bookLibrary.removeBook('A song of Ice and Fire');

console.log(
    '\nAll books after removing "A song of Ice and Fire":\n',
    bookLibrary.getAllBooks()
);


/*

Output: 

> node 2.js

All books:
 [
  '3 Days of Happiness',
  'A song of Ice and Fire',
  'Harry Potter and the Goblet of Fire'
]

Add book 'Harry Potter and the Order of the Phoenix' by J.K. Rowling


All books after adding "Harry Potter and the Order of the Phoenix":
 [
  '3 Days of Happiness',
  'A song of Ice and Fire',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix'
]

Books by J.K. Rowling:
 [
  {
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J.K. Rowling',
    yearPublished: 2000
  },
  {
    title: 'Harry Potter and the Order of the Phoenix',
    author: 'J.K. Rowling',
    yearPublished: 2003
  }
]

Remove book 'A song of Ice and Fire'


All books after removing "A song of Ice and Fire":
 [
  '3 Days of Happiness',
  'Harry Potter and the Goblet of Fire',
  'Harry Potter and the Order of the Phoenix'
]
  
*/