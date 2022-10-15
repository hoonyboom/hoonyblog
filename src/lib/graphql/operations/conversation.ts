import { gql } from "@apollo/client";

const ConversationFields = `
  conversation {
    id
    ConversationParticipant {
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMesssage {
      id
      sender {
        id
        username
      }
      body
      createdAt
    }
    updatedAt
  }
`;

export default {
  Queries: {
    conversation: gql`
      query Conversation {
        ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
