# Week 1 - Books CRUD (MERN assignment)

This repository contains small Node.js scripts that demonstrate using Mongoose to model a collection of books, seed the database, and run queries/CRUD operations.

## What’s included

- `db.js` — MongoDB connection helper (exports `connectDB` and `mongoose`).
- `Models/Books.js` — Mongoose schema and `Book` model.
- `Insert_books.js` — Sample book data exported as a CommonJS module.
- `Seed.js` — Script that connects to MongoDB and inserts the sample books into the collection.
- `queries.js` — Implements many query examples (find, update, delete, aggregation, indexing) and exports an async `main()` function.
- `crud.js` — Small runner that requires `queries.js` and invokes `main()` so you can run the queries with `node crud.js`.

## Prerequisites

- Node.js (v14+ recommended) installed on your machine.
- A running MongoDB instance (local or Atlas). You need a connection string.

## Setup

1. Clone or copy this repository to your machine.
2. From the project root, install dependencies:

```powershell
npm install
```

3. Create a `.env` file in the project root with your MongoDB connection string. Example:

```text
# .env
MONGODB_URI=mongodb://localhost:27017/books_db
```

If you use MongoDB Atlas, put the provided connection URI (replace user/password and DB name accordingly).

## Run the scripts

- Seed the database with sample books (this script connects and inserts the contents of `Insert_books.js`):

```powershell
node Seed.js
```

- Run the queries/CRUD examples (use this runner which calls `queries.main()`):

```powershell
node crud.js
```

Notes:
- `queries.js` exports `main()` but does not invoke it directly — `crud.js` calls it. You can also call `main()` programmatically from another file.
- `Insert_books.js` is a data module (exports an array). Do not run it directly with `node`.

## Files of interest

- `Models/Books.js` — shows the schema fields and types (title, author, published_year, price, in_stock, pages, publisher).
- `queries.js` — contains examples of:
  - Simple find queries and projections
  - Updates (`findOneAndUpdate`)
  - Deletes (`findOneAndDelete`)
  - Aggregation pipelines (average price by genre, author with most books, grouping by decade)
  - Index creation and explain() usage

## Troubleshooting

- Error connecting to MongoDB:
  - Ensure MongoDB is running and your `MONGODB_URI` is correct.
  - If using localhost, make sure the default port is open (27017) and the DB name in the URI is valid.
  - For Atlas, ensure your IP is whitelisted or set to allow access from anywhere (for development), and that credentials are correct.

- Mongoose validation errors when seeding:
  - The `Book` schema requires several fields. If you modified `Insert_books.js`, ensure each book has the required fields: `title`, `author`, `published_year`, `price`, `pages`, `publisher`.

## Optional: Add npm scripts (recommended)

You can add shortcut scripts to your `package.json` under the `scripts` section:

```json
"scripts": {
  "start": "node crud.js",
  "seed": "node Seed.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Then run them with:

```powershell
npm run seed
npm start
```

## Dependencies

This project uses (see `package.json`):

- `dotenv` — load environment variables from `.env`.
- `mongoose` — MongoDB ODM.
- `mongodb` — MongoDB driver (installed as a dependency).

## Quick checklist

- [ ] Install Node dependencies (`npm install`).
- [ ] Create `.env` with `MONGODB_URI`.
- [ ] Start MongoDB (or confirm Atlas access).
- [ ] Run `node Seed.js` to populate test data.
- [ ] Run `node crud.js` to exercise the queries.



---

Last updated: 2025-10-20
