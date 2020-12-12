const database = require('../database.js');
const existingBook = { 
    title: "The Fellowship of the Ring", 
    author: "J.R.R. Tolkien", 
    genre: "Fiction", 
    imageURL:"https://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
};

const newBook = { 
    title: "This is a Test Book", 
    author: "Nobody", 
    genre: "Fiction", 
    imageURL:"https://books.google.com/books/content?id=aWZzLPhY4o0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
};

test('getBookID() works with non existing record', async () => {
    expect.assertions(1);
     await expect(database.getBookID("Pale Blue Dot", "Not Carl Sagan")).resolves.toBe(-1);
});

test('getBookID() works with existing record', async () => {
    expect.assertions(1);
     await expect(database.getBookID("Pale Blue Dot", "Carl Sagan")).resolves.toBe(2);
});


test('insertBook() functions correctly when inserting existing record', async () => {
    expect.assertions(1);
     await expect(database.insertBook(existingBook)).resolves.toBe(1);
});

test('insertBook() functions correctly when inserting new record', async () => {
    expect.assertions(1);
     await expect(database.insertBook(newBook)).resolves.toEqual(expect.any(Number));
});