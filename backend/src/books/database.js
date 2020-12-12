var mysql = require('mysql');
const Books = require('./books');
const Recommendation = require('./recommendation');

var con = mysql.createConnection({
    host: "localhost",
    user: "matt",
    password: "******",
    database: "bookshelf"
});


//(RecommendationID Int NOT NULL AUTO_INCREMENT, BookID Int, RecommendedBy VARCHAR(255), DateRecommended Date, Primary Key (RecommendationID)
async function queryDatabase(sqlStatement, values) {
    return new Promise(async function (resolve, reject) {
        con.query(sqlStatement, values, function (error, results) {
            if (error) {
                throw error;
            } else {
                console.log(results)
                resolve(results);
            }
        });
    })
}

async function getBooks() {
    try {
        const results = await queryDatabase('SELECT * from Books')
        return results;
    }
    catch (error) {
        throw error;
    }
}

async function getScienceFictionBooks() {
    try {
        const Fiction = "Fiction";
        const results = await queryDatabase('SELECT * from Books WHERE Genre="Fiction"')
        console.log(results);
        return results;
    }
    catch (error) {
        throw error;
    }
}

async function insertIntoRecommendations(recommendation) {

    recommendation.book.ID = await insertIntoBooks(recommendation.book); //Book needs to be inserted into Books Table first. 
    var sql = "INSERT INTO Recommendations (BookID, RecommendedBy) Values ?"; //BookID is primary key in Book Table
    let values = [[recommendation.book.ID, recommendation.recommendedBy]];
    try {
        await queryDatabase(sql, [values]);
        recommendation.book = await getBookRecommendationCount(recommendation.book);
    }
    catch (error) {
        throw error;
    }

    return recommendation;
}

async function getFavoriteBooks() {
    var sql = "SELECT Title, Author, ImageURL FROM Library INNER JOIN Books ON Books.BookID=Library.BookID";
    try {
        results = await queryDatabase(sql);
        console.log(results);
    }
    catch (error) {
        throw error;
    }
}

async function getBookRecommendationCount(book) { 

    var sql = "SELECT COUNT(BookID) AS 'count' FROM Recommendations WHERE BookID = ? GROUP BY BookID";
    try {
        const results = await queryDatabase(sql, [book.ID]);
        if (results.length > 0) {
            return results[0].count;
        } else {
            return 0;
        }
    }
    catch (error) {
        return 0;
    }
}

async function printAllFrom(table) {
    try {
        const results = await queryDatabase('SELECT * FROM ' + table)
        console.log(results);
    }
    catch (error) {
        throw error;
    }
}

//SELECT Count(*), BookID, Title, Author FROM Recommendations Group by BookID Order by Count(*) Desc;
async function getMostRecommendedBooks() {

    var sql = "SELECT Count(Recommendations.BookID), Recommendations.BookID, Title, Author FROM Recommendations INNER JOIN Books ON Books.BookID =Recommendations.BookID Group by Recommendations.BookID Order by Count(*) DESC";

    try {
        const results = await queryDatabase(sql);
        return results;
    }
    catch (error) {
        throw error;
    }
}

// TABLE Books (BookID Int NOT NULL AUTO_INCREMENT, Title VARCHAR(255), Author VARCHAR(255), DatePublished DATE, Genre VARCHAR(255),ImageURL VARCHAR(255), Primary Key (BookID))";
async function insertIntoBooks(book) {

    if (! await isBookInDatabase(book.title, book.author)) {
        console.log("book not in database");
        let sql = "INSERT INTO Books (Title, Author, Genre, ImageURL) Values ?";
        var values = [[book.title, book.author, book.genre, book.imageURL]];
        try {
            await queryDatabase(sql, [values]);
        } catch (error) {
            throw error;
        }
    } else {
        console.log("book already in database");
    }

    return await getBookID(book.title, book.author);
}

async function isBookInDatabase(title, author) {

    let sql = 'SELECT BookID from Books WHERE Title = ? AND Author = ?';

    try {
        let results = await queryDatabase(sql, [title, author]);
        if (results.length > 0) {
            return true; //book found in database
        }
        else {
            return false; //Book was not in database
        }
    } catch (error) {
        throw error;
    }
}

async function getBookID(title, author) {

    let sql = 'SELECT BookID from Books WHERE Title = ? AND Author = ?';

    try {
        let results = await queryDatabase(sql, [title, author]);
        if (results.length > 0) {
            return results[0].BookID; //book found in database and returning id
        }
        else {
            return -1; //Book was not in database
        }
    } catch (error) {
        throw error;
    }
}

module.exports =
{
    getBooks: getBooks,
    insertIntoRecommendations: insertIntoRecommendations,
    getMostRecommendedBooks: getMostRecommendedBooks,
    getBookID: getBookID,
    insertIntoBooks: insertIntoBooks,
    getScienceFictionBooks: getScienceFictionBooks
};

async function resetDatabase() {
    await queryDatabase("DROP DATABASE bookshelf");
    await queryDatabase("CREATE DATABASE bookshelf");
    await queryDatabase("USE bookshelf");
    await queryDatabase("CREATE TABLE Books (BookID Int NOT NULL AUTO_INCREMENT, Title VARCHAR(255), Author VARCHAR(255), Genre VARCHAR(255),ImageURL VARCHAR(255), Primary Key (BookID))");
    await queryDatabase("CREATE TABLE Library (BookID Int NOT NULL, ReadBook BOOLEAN, Primary Key (BookID))");
    await queryDatabase("CREATE TABLE Recommendations (RecommendationID Int NOT NULL AUTO_INCREMENT, BookID Int, RecommendedBy VARCHAR(255), Primary Key (RecommendationID))");
    await insertDefaultBooks();
    await insertFavoriteBooks();
    await insertIntoRecommendations(Recommendation);
}


async function insertDefaultBooks() {
    for (book of Books) {
        insertIntoBooks(book);
    }
}

async function insertFavoriteBooks() {
    var values = [
        [1, true],
        [2, true],
        [3, true],
        [4, true],
        [5, true],
        [6, true],
        [7, true],
        [8, true]
    ];
    await queryDatabase("INSERT INTO Library (BookID, ReadBook) Values ?", [values]);
}


// resetDatabase();
// printAllFrom("Recommendations");

// console.log( getMostRecommendedBooks());
