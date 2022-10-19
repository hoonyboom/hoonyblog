export {};
// import conversation from "@/lib/graphql/operations/conversation";
// import { ConversationData, ConversationPopulated, GraphqlContext } from "@/utils/types";
// import { Prisma } from "@prisma/client";
// import { ApolloError } from "apollo-server-nextjs";

// const resolvers = {
//   Query: {
//     conversation: async (
//       _: any,
//       __: any,
//       context: GraphqlContext,
//     ): Promise<Array<ConversationPopulated>> => {
//       const { session, prisma } = context;

//       if (!session?.user) throw new ApolloError("Not Authorized");

//       const {
//         user: { id: userId },
//       } = session;

//       try {
//         const conversations = await prisma.conversation.findMany({
//           // where: {
//           //   ConversationParticipant: {
//           //     some: {
//           //       userId: {
//           //         equals: userId,
//           //       },
//           //     },
//           //   },
//           // },
//           include: conversationPopulated,
//         });

//         /**
//          *
//          */
//         return conversations.filter(
//           conversation =>
//             !!conversation.ConversationParticipant.find(p => p.userId === userId),
//         );
//       } catch (error) {
//         const err = error as ErrorEvent;
//         console.log("Conversations Error", err);
//         throw new ApolloError(err.message);
//       }
//     },
//   },

//   Mutation: {
//     createConversation: async (
//       _: any,
//       args: { participantIds: string[] },
//       context: GraphqlContext,
//     ): Promise<{ conversationId: string }> => {
//       const { session, prisma } = context;
//       const { participantIds } = args;

//       if (!session?.expires) throw new ApolloError("Not Authorized");

//       const {
//         user: { id: userId },
//       } = session;

//       try {
//         const conversation = await prisma.conversation.create({
//           data: {
//             ConversationParticipant: {
//               createMany: {
//                 data: participantIds.map(id => ({
//                   userId: id,
//                   hasSeenLatestMessage: id === userId,
//                 })),
//               },
//             },
//           },
//           include: conversationPopulated,
//         });

//         return {
//           conversationId: conversation.id,
//         };
//       } catch (error) {
//         console.log("createConversation Error", error);
//         throw new ApolloError("Error Created Conversation");
//       }
//     },
//   },
// };

// export const participantPopulated =
//   Prisma.validator<Prisma.ConversationParticipantInclude>()({
//     user: {
//       select: {
//         id: true,
//         username: true,
//       },
//     },
//   });

// export const conversationPopulated = Prisma.validator<Prisma.ConversationInclude>()({
//   ConversationParticipant: {
//     include: participantPopulated,
//   },
//   latestMesssage: {
//     include: {
//       sender: {
//         select: {
//           id: true,
//           username: true,
//         },
//       },
//     },
//   },
// });

// export default resolvers;
