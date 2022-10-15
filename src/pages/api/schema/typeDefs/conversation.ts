import { gql } from "apollo-server-nextjs";

const typeDefs = gql`
  scalar Date

  type Mutation {
    createConversation(participantIds: [String]): createConversationResponse
  }

  type createConversationResponse {
    conversationId: String
  }

  type Conversation {
    id: String
    latestMesssage: Message
    ConversationParticipant: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }

  type Query {
    conversation: [Conversation]
  }
`;

export default typeDefs;
