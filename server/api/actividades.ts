import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler( async (event)=> {

    const actividades = await prisma.actividades.findMany({
        include:{
            usuario: true,
            estado: true
        }
    });

    return actividades

})