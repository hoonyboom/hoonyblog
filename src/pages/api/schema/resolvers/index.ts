import { merge } from "lodash";
import userResolvers from "./user";

const resolvers = merge({}, userResolvers);

export default resolvers;
