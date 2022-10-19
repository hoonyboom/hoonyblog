import { gql } from "@apollo/client";

const Query = {
  Queries: {
    loadComments: gql`
      query loadComments($postId: String!) {
        loadComments(postId: $postId) {
          id
          createdAt
          nickname
          message
        }
      }
    `,
  },
  Mutations: {
    createComment: gql`
      mutation createComment($postId: String!, $message: String!) {
        createComment(postId: $postId, message: $message) {
          success
          error
        }
      }
    `,
  },
};

export default Query;
