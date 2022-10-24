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

    deleteComment: gql`
      mutation deleteComment($commentId: String!, $nickname: String!) {
        deleteComment(commentId: $commentId, nickname: $nickname) {
          success
          error
        }
      }
    `,

    updateComment: gql`
      mutation updateComment($commentId: String!, $message: String!) {
        updateComment(commendId: $commentId, message: $message) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};

export default Query;
