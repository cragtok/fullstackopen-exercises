require("dotenv").config();
const { GraphQLError } = require("graphql");
const { ApolloServerErrorCode } = require("@apollo/server/errors");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const User = require("./models/user");
const Book = require("./models/book");

const JWT_SECRET = process.env.JWT_SECRET;

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
                throw new GraphQLError("Internal Server Error", {
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    },
                });
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
                throw new GraphQLError("Not Authenticated", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            }

            try {
                let bookAuthor = await Author.findOne({ name: args.author });
                if (!bookAuthor) {
                    bookAuthor = new Author({ name: args.author });
                    await bookAuthor.save();
                }
                const newBook = new Book({ ...args, author: bookAuthor._id });
                await (await newBook.save()).populate("author");

                pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
                return newBook;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        invalidArgs: args,
                    },
                });
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError("Not Authenticated", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                    },
                });
            }
            try {
                const foundAuthor = await Author.findOne({ name: args.name });
                foundAuthor.born = args.setBornTo;
                await foundAuthor.save();
                return foundAuthor;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        invalidArgs: args,
                    },
                });
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
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        invalidArgs: args,
                    },
                });
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: ApolloServerErrorCode.BAD_USER_INPUT,
                        invalidArgs: args,
                    },
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
