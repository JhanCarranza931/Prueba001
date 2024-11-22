import { PrismaClient } from "@prisma/client";

const prisma =  new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { id_actividad, id_estado } = body;
    
    try {
      // Actualizar el estado de la actividad
      const updatedActividad = await prisma.actividades.update({
        where: { id: id_actividad },
        data: { estado_id: id_estado },
      });
  
      return {
        status: 200,
        message: 'Estado de la actividad actualizado exitosamente',
        actividad: updatedActividad,
      };
    } catch (error) {
      return {
        status: 500,
        message: `Error al actualizar el estado de la actividad: ${error.message}`,
      };
    }
  });
  