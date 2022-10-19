import { gql } from "apollo-server-nextjs";

const typeDefs = gql`
  type Comment {
    id: String
    userId: String
    createdAt: Date
    message: String
  }

  type Query {
    loadComments(postId: String): [Comment]
  }

  type Mutation {
    createComment(message: String): createCommentResponse
  }

  type createCommentResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
