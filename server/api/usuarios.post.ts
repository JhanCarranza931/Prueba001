import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const {dni,nombre,apellido,carrera,correo,password,telefono} = body
    try {
        const NewUsuario= await prisma.usuario.create({
            data:{
                dni,
                nombre,
                apellido,
                carrera,
                correo,
                password,
                telefono
    
            } 
        });
        return {
            status: 201,
            usuario: NewUsuario,
          };
        
    } catch (error) {
        return {
            status: 500,
            message: 'Error al crear el usuario',
          };
    }
})