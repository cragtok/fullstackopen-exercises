require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
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
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: (root) => {
            let count = 0;
            return count;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

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
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }
            try {
                const foundAuthor = await Author.findOne({ name: args.name });
                foundAuthor.born = args.setBornTo;
                await foundAuthor.save();
                return foundAuthor;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
        createUser: async (root, args) => {
            try {
                const user = new User({
                    username: args.username,
                    favouriteGenre: args.favouriteGenre,
                });
                const newUser = await user.save();
                return newUser;
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new UserInputError("wrong credentials");
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
