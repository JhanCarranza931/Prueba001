import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { iduser, nombre, apellido, carrera, correo, telefono } = body;


    if (!iduser) {
      throw createError({
        statusCode: 400,
        message: "El ID del usuario es obligatorio para realizar la edición.",
      });
    }

  
    const updatedUsuario = await prisma.usuario.update({
      where: {
        id: parseInt(iduser),
      },
      data: {
        nombre, 
        apellido, 
        carrera, 
        correo, 
        telefono, 
      },
    });
    return {
      status: 200,
      message: "Usuario actualizado correctamente",
      
    };
  } catch (error) {
    console.error("Error actualizando el usuario:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: `Error al actualizar el usuario: ${error.message}`,
    });
  }
});
