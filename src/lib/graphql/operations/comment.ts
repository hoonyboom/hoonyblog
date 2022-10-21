import { gql } from "@apollo/client";

const Query = {
  Queries: {
    loadComments: gql`
      query loadComments($postId: String!) {
        loadComments(postId: $postId) {
          id
          message
          nickname
          profileImage
          parentId
          createdAt
        }
      }
    `,
  },
  Mutations: {
    createComment: gql`
      mutation createComment($message: String!, $postId: String!) {
        createComment(message: $message, postId: $postId) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};

export default Query;
