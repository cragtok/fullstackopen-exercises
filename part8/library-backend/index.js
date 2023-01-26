require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log("error connection to MongoDB:", error.message);
    });

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

const resolvers = {
    Query: {
        bookCount: async () => {
            const books = await Book.find({});
            return books.length;
        },
        authorCount: async () => {
            const authors = await Author.find({});
            return authors.length;
        },
        allBooks: async (root, args) => {
            try {
                if (!args.author && !args.genre) {
                    return await Book.find({}).populate("author");
                }
                if (args.author && !args.genre) {
                    const bookAuthor = await Author.find({ name: args.author });
                    return await Book.find({ author: bookAuthor }).populate(
                        "author"
                    );
                }

                if (args.genre && !args.author) {
                    return await Book.find({
                        genres: { $in: [args.genre] },
                    }).populate("author");
                }

                if (args.genre && args.author) {
                    const bookAuthor = await Author.find({ name: args.author });
                    return await Book.find({
                        genres: { $in: [args.genre] },
                        author: bookAuthor,
                    }).populate("author");
                }
            } catch (error) {
                console.log(error);
            }
        },
        allAuthors: async () => await Author.find({}),
    },
    Author: {
        bookCount: (root) => {
            let count = 0;
            return count;
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            try {
                let bookAuthor = await Author.findOne({ name: args.author });
                if (!bookAuthor) {
                    bookAuthor = new Author({ name: args.author });
                    await bookAuthor.save();
                }
                const newBook = new Book({ ...args, author: bookAuthor._id });
                await (await newBook.save()).populate("author");
                return newBook;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
        editAuthor: async (root, args) => {
            try {
                const foundAuthor = await Author.findOne({ name: args.name });
                foundAuthor.born = args.setBornTo;
                await foundAuthor.save();
                return foundAuthor;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
