import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  
  const method = event.node.req.method;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); 

  if (method === "POST") {
    const body = await readBody(event);
    console.log(body)
    const dni = body
    

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { dni: dni },  
      });
      if (!usuario) {
        return {
          status: 404,
          message: "Usuario no encontrado ",
        };
      }
      const asistenciahoy = await prisma.asistencias.findMany({
        where:{
          usuario_id: usuario.id,
          hora_entrada : {
            gte:hoy,
            lt:new Date(hoy.getTime() + 24 * 60 * 60 * 1000)
          }
        }
      })

      if(asistenciahoy.length>0){
        return {
          status:409,
          message:`${usuario.nombre}, Ya registraste tu entrada el día de hoy`
      }
    }
     
        const ret= await prisma.asistencias.create({
            data: {
              hora_entrada: new Date() ,
              usuario_id: usuario.id, 
              estado_asis_id: 1,
            },
          });
          
          console.log(ret)
      
      

      return {
        status:201,
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

  if (method==="GET"){
    try{
      const asistencias = await prisma.asistencias.findMany({
        include:{
          usuario:true,
          estadoAsis:true
        }
      });
      return asistencias

    }catch(error){
      return{
        status:500,
        message:"Error al listar datos"
      }
    }
  }

  if(method === "PUT"){
    try{
      const body = await readBody(event);
        const dni = body;
        console.log(dni)
        const usuario = await prisma.usuario.findUnique({
          where: { dni: dni },  
        });
        if (!usuario) {
          return {
            status: 404,
            message: "Usuario no encontrado ",
          };
        }
        const ultimaAsistencia = await prisma.asistencias.findFirst({
          where: {
            usuario_id: usuario.id,
          },
          orderBy: {
            hora_entrada: 'desc',
          },
        });
    
        if (ultimaAsistencia) {
          const fechaHoy = new Date();
          const fechaAsistencia = new Date(ultimaAsistencia.hora_entrada);
    
          if (
            fechaAsistencia.toDateString() === fechaHoy.toDateString() &&
            ultimaAsistencia.hora_salida
          ) {
            return {
              status: 400,
              message: `${usuario.nombre}, Ya has registrado tu salida hoy.` ,
            };
          }
        } else {
          return {
            status: 404,
            message: "No se encontró un registro de asistencia para este usuario",
          };
        }
        await prisma.asistencias.update({
          where:{
          id: ultimaAsistencia.id
          },
          data:{
            hora_salida:new Date()
          }
        })
        return {
          status:201,
          message: "Salida registrada correctamente",
        };
    }catch(error){
      console.log(error)
      return{
        status:500,
        message:"Error aL registrar tu salida"
      }
    }
  }
});
