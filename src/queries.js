import gql from 'graphql-tag'

export const DROPPED = gql`
    query dropped(
    $where: DropWhereInput,
    $orderBy: DropOrderByInput
    ) {
        dropped(where: $where, orderBy: $orderBy) {
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
`

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
`

export const AM_I_AUTH = gql`
    query {
        amIAuth {
            isAuth
            me {
                id
                username
                email
                bio
            }
        }
    }
`
