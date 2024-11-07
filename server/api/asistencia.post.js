import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const method = event.node.req.method;
  console.log(body)

  if (method === "POST") {
    const {dni, estado_asis_id} = body;

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { dni: dni },  
      });
      if (!usuario) {
        return {
          status: 404,
          message: "Usuario no encontrado",
        };
      }
     
        const ret= await prisma.asistencias.create({
            data: {
              hora_entrada: new Date() ,
              usuario_id: usuario.id, 
              estado_asis_id: estado_asis_id,
            },
          });
          
          console.log(ret)
      
      

      return {
        message: "Asistencia registrada correctamente",
      };
    } catch (error) {
        console.log(error)
      return {
        status: 500,
        message: "Error al registrar la asistencia ",
      };
    }
  }
});
