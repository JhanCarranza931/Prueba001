import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Consulta las actividades, incluyendo los datos relacionados de usuario y estado
    const actividades = await prisma.actividades.findMany({
      include: {
        usuario: true,
        estado: true,
      },
    });

    return actividades;
  } catch (error) {
    console.error("Error al obtener actividades:", error);

    // Enviar un mensaje de error claro al cliente
    return {
      statusCode: 500,
      message: "Error al obtener actividades. Por favor, intente más tarde.",
      error: error,
    };
  }
});
