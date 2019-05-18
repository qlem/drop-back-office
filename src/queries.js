import gql from 'graphql-tag'

export const DROP = gql`
    query drop($id: ID!) {
        drop(id: $id) {
            id
            createdAt
            updatedAt
            text
            color
            author {
                id
                username
            }
        }
    }
`;

export const USERS = gql`
    query {
        users {
            id
            email
            username
            drops {
                id
            }
        }
    }
`;

export const DROPPED = gql `
    query {
        dropped {
          id
          text
          author {
            username
            email
          }
          location {
            latitude
            longitude
            altitude
          }
          likeCount
          dislikeCount
        }
    }
`;

export const LASTDROPPED = gql `
    query {
          dropped(orderBy: createdAt_DESC, first: 10 ) {
                id
                createdAt
                text
                author {
                    username
                    email
                }
                color
          }
    }
`;