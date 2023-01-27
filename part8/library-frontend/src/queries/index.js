import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
    query ($author: String, $genre: String) {
        allBooks(author: $author, genre: $genre) {
            id
            title
            published
            author {
                name
            }
            genres
        }
    }
`;

export const CREATE_BOOK = gql`
    mutation (
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            id
            title
            published
            author {
                name
                id
            }
            genres
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

export const EDIT_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            id
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query {
        me {
            username
            favouriteGenre
            id
        }
    }
`;
