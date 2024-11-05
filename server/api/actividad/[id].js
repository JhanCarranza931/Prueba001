import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const {id} = event.context.params
    console.log(id)

    const actividades = await prisma.actividades.findMany({
        where:{
            usuario_id: parseInt(id)
        },
        include:{
            estado:true
        }
    })

    return actividades
})