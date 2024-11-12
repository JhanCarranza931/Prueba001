import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const {dni,nombre,apellido,carrera,correo,password,telefono,rol} = body
    const hashedPassword = await bcrypt.hash(password, 10)
    try {

        const searchRol = await prisma.roles.findUnique({
            where: {rol:rol}
        })
        if (!searchRol) {
            return {
              status: 400,
              message: 'Rol no encontrado',
            };
          }
          
        const NewUsuario= await prisma.usuario.create({
            data:{
                dni,
                nombre,
                apellido,
                carrera,
                correo,
                password : hashedPassword,
                telefono,
                roles:{
                    create:{
                        rol_id: searchRol.id
                    }
                }
            } 
        });
        return {
            status: 201,
            usuario: NewUsuario,
          };
        
    } catch (error) {
        return {
            status: 500,
            message: `Error al crear el usuario ${error}`,
          };
    }
})