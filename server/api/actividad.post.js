import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const {actividad, id_user,id_estado,limit} = body
    const limitdate = new Date(limit)
    console.log(body)

    try {
        const NewActividad= await prisma.actividades.create({
            data:{
                actividad:actividad,
                usuario_id: id_user,
                estado_id : id_estado,
                fecha_limite:limitdate,
            } 
        });
        return {
            status: 201,
            id: NewActividad.usuario_id,
            usuario: NewActividad,
            message: 'Actividad agregada exitosamente'
          };
        
    } catch (error) {
        return {
            status: 500,
            message: 'Error al Asignar la actividad',
          };
    }
})