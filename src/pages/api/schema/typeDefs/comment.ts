import { gql } from "apollo-server-nextjs";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createComment(message: String!, postId: String!): CreateCommentResponse!
    deleteComment(commentId: String!, nickname: String!): DeleteCommentResponse!
    updateComment(commentId: String!, message: String!): UpdateCommentResponse!
    replyComment(
      postId: String!
      message: String!
      parentId: String!
    ): ReplyCommentResponse!
  }

  type CreateCommentResponse {
    success: Boolean
    error: String
  }

  type DeleteCommentResponse {
    success: Boolean
    error: String
  }

  type UpdateCommentResponse {
    success: Boolean
    error: String
  }

  type ReplyCommentResponse {
    success: Boolean
    error: String
  }

  type Like {
    commentId: String!
    userId: String!
  }

  type Comment {
    id: String!
    nickname: String!
    message: String!
    postId: String!
    profileImage: String!
    createdAt: Date
    updatedAt: Date
    parentId: String
  }

  type Query {
    loadComments(postId: String!): [Comment!]!
  }
`;

export default typeDefs;
