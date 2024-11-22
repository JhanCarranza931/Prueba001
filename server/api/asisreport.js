import { PrismaClient } from "@prisma/client";

const prisma =  new PrismaClient()


export default defineEventHandler(async () => {
    const asistencias = await prisma.asistencias.findMany({
      include: {
        usuario: true, // Relación con el modelo Usuario
        estadoAsis: true, // Relación con el modelo EstadoAsis
      },
    });
  
    return asistencias;
  });