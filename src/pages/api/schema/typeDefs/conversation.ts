import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Mutation {
    createConversation(participantIds: [String]): createConversationResponse
  }

  type createConversationResponse {
    conversationId: String
  }
`;

export default typeDefs;
