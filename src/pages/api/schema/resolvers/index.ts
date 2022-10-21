import { merge } from "lodash";
import userResolvers from "./user";
import commentResolvers from "./comment";

const resolvers = merge({}, userResolvers, commentResolvers);

export default resolvers;
