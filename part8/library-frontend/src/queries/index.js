import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
    query {
        allBooks {
            id
            title
            published
            author
        }
    }
`;

export const CREATE_PERSON = gql`
    mutation createBook(
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
            author
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
