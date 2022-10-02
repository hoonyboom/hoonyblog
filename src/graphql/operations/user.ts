import { gql } from "@apollo/client";

const Query = {
  Queries: {},
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
