import gql from 'graphql-tag'

export const LOGINBACK = gql`
  mutation loginBack($email: String!, $password: String!) {
    loginBack(email: $email, password: $password) {
      token
    }
  }
`