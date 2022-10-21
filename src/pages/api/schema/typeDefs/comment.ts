import { gql } from "apollo-server-nextjs";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createComment(message: String, postId: String): CreateCommentResponse
  }

  type CreateCommentResponse {
    success: Boolean
    error: String
  }

  type Like {
    commentId: String
    userId: String
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
    loadComments(postId: String): [Comment]
  }
`;

export default typeDefs;
