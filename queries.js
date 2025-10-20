const {connectDB, mongoose} = require('./db'); //importing connection file
const {Book} = require('./Models/Books'); //importing Book model

async function main(){
    await connectDB(); //connecting to database

    //Find all books in a specific genre
    const genreToFind = 'Fantasy';
    const booksInGenre = await Book.find({ genre: genreToFind });
    console.log(`Books in genre "${genreToFind}":`, booksInGenre);
    
    //Find books published after 1950
    const booksAfter1950 = await Book.find({ published_year: { $gt: 1950 } });
    console.log("Books published after 1950:", booksAfter1950);

    //Find books by a specific author: "Harper Lee"
    const authorToFind = 'Harper Lee';
    const booksByAuthor = await Book.find({ author: authorToFind });
    console.log(`Books by author "${authorToFind}":`, booksByAuthor);
    //Update the price of "The Hobbit" to 20.99
    const updatedBook = await Book.findOneAndUpdate(
        { title: 'The Hobbit' },
        { price: 20.99 },
        { new: true } //to return the updated document
    );
    console.log("Updated Book:", updatedBook);
    //Delete a book by its title: "Animal Farm"
    const deletedBook = await Book.findOneAndDelete({ title: 'Animal Farm' });
    console.log("Deleted Book:", deletedBook);
    //Task 3: Advanced Queries
    //Write a query to find books that are both in stock and published after 2010
    const QueryBooks = await Book.find({ in_stock: true, published_year: { $gt: 2010 } });
    console.log("Books in stock and published after 2010:", QueryBooks);
    //Use projection to return only the title, author, and price fields in your queries
    const ProjectedBooks = await Book.find({}, 'title author price');
    console.log("ProjectedBooks (title, author, price):", ProjectedBooks);
    //Implement sorting to display books by price (both ascending and descending)
    const SortedBooksAsc = await Book.find().sort({ price: 1 }); //ascending
    console.log("Books sorted by price (ascending):", SortedBooksAsc);
    const SortedBooksDesc = await Book.find().sort({ price: -1 }); //descending
    console.log("Books sorted by price (descending):", SortedBooksDesc);
    //Use the limit and skip methods to implement pagination (5 books per page)
    const page = 1; //example page number
    const limit = 5;
    const skip = (page - 1) * limit;
    const PaginatedBooks = await Book.find().skip(skip).limit(limit);
    console.log(`Books on page ${page}:`, PaginatedBooks);

    //Task 4: Aggregation Pipeline
    //Create an aggregation pipeline to calculate the average price of books by genre
    const AvgPriceByGenre = await Book.aggregate([
        {
            $group: {
                _id: "$genre",
                averagePrice: { $avg: "$price" }
            }
        }
    ]);
    console.log("Average price of books by genre:", AvgPriceByGenre);
    //Create an aggregation pipeline to find the author with the most books in the collection
    const AuthorWithMostBooks = await Book.aggregate([
        {
            $group: {
                _id: "$author",
                bookCount: { $sum: 1 }
            }
        },
        { $sort: { bookCount: -1 } },
        { $limit: 1 }
    ]);
    console.log("Author with the most books:", AuthorWithMostBooks);
    //Implement a pipeline that groups books by publication decade and counts them
    // Group books by decade and count how many books in each decade
    // We compute decade as: Math.floor(published_year / 10) * 10
    const booksByDecade = await Book.aggregate([
        {
            $project: {
                published_year: 1
            }
        },
        {
            $addFields: {
                decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] }
            }
        },
        {
            $group: {
                _id: "$decade",
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    console.log("Books grouped by publication decade:", booksByDecade);

    //Task 5: Indexing
    //Create an index on the title field for faster searches
    await Book.collection.createIndex({ title: 1 });
    console.log("Index created on title field");
    //Create a compound index on author and published_year
    await Book.collection.createIndex({ author: 1, published_year: -1 });
    console.log("Compound index created on author and published_year fields");
    //Use the explain() method to demonstrate the performance improvement with your indexes
    const explainResult = await Book.find({ title: 'The Hobbit' }).explain("executionStats");
    console.log("Explain result for query on title 'The Hobbit':", explainResult);

    mongoose.connection.close(); //closing the connection

}

module.exports = { main };