import { gql } from "@apollo/client";

const Query = {
  Queries: {
    loadComments: gql`
      query loadComments($postId: String!) {
        loadComments(postId: $postId) {
          id
          postId
          message
          nickname
          profileImage
          parentId
          createdAt
          secret
          _count {
            likes
          }
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

    replyComment: gql`
      mutation replyComment($message: String!, $postId: String!, $parentId: String!) {
        replyComment(message: $message, postId: $postId, parentId: $parentId) {
          success
          error
        }
      }
    `,

    updateComment: gql`
      mutation updateComment($commentId: String!, $message: String!) {
        updateComment(commentId: $commentId, message: $message) {
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

    toggleLike: gql`
      mutation toggleLike($commentId: String!) {
        toggleLike(commentId: $commentId) {
          success
          error
        }
      }
    `,
  },

  Subscriptions: {},
};

export default Query;
