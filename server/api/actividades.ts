import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const actividades = await prisma.actividades.findMany({
      include: {
        usuario: true,
        estado: true,
      },
      orderBy: {
        fecha: 'desc', 
      },
    });
    return actividades;
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    return {
      statusCode: 500,
      message: "Error al obtener actividades. Por favor, intente más tarde.",
      error: error,
    };
  }
});
