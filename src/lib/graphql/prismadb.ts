/* import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// const pubsub =

export default client;
 */

declare global {
  //eslint-disable-next-line
  var prisma: PrismaClient;
}

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") prisma = new PrismaClient();
else {
  if (!globalThis.prisma) globalThis.prisma = new PrismaClient();

  prisma = globalThis.prisma;
}

export default prisma;
