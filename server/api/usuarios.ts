import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const usuarios = await prisma.usuario.findMany();
    return usuarios;
});
