import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma instance
const prisma = new PrismaClient();

export default prisma;
