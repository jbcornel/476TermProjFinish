import { PrismaClient } from '@prisma/client'

let globalWithPrisma = global
if (!globalWithPrisma.prisma) {
  globalWithPrisma.prisma = new PrismaClient()
}
const prisma = globalWithPrisma.prisma

export default prisma
