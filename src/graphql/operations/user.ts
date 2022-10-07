import { gql } from "@apollo/client";

const Query = {
  Queries: {
    searchUser: gql`
      query searchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation createUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};

export default Query;
