import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const {actividad, id_user,id_estado} = body

    try {
        const NewActividad= await prisma.actividades.create({
            data:{
                actividad:actividad,
                usuario_id: id_user,
                estado_id : id_estado

    
            } 
        });
        return {
            status: 201,
            usuario: NewActividad,
            message: 'Actividad agregada exitosamente'
          };
        
    } catch (error) {
        return {
            status: 500,
            message: 'Error al crear el usuario',
          };
    }
})