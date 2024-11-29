// server/api/actividades.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { year } = getQuery(event); // Recibe el año desde los parámetros de la consulta

    // Validar el año
    if (!year || isNaN(year)) {
      return { statusCode: 400, body: { message: 'El parámetro "year" debe ser un número válido.' } };
    }

    // Realizar la consulta raw para agrupar las asistencias por mes
    const asistencias = await prisma.$queryRaw`
      SELECT 
        EXTRACT(MONTH FROM "hora_entrada") AS mes, 
        COUNT(id) AS total_asistencias
      FROM "Asistencias"  -- Asegúrate de que el nombre de la tabla esté entre comillas si tiene mayúsculas
      WHERE "hora_entrada" >= ${new Date(`${year}-01-01`)}
        AND "hora_entrada" < ${new Date(`${parseInt(year) + 1}-01-01`)}
      GROUP BY mes
      ORDER BY mes;
    `;

    // Crear un array con 12 posiciones (para cada mes)
    const resultados = Array(12).fill(0);

    // Llenar el array con los resultados obtenidos
    asistencias.forEach((asistencia) => {
      const mes = parseInt(asistencia.mes, 10) - 1; // Ajustar el mes (0-11)
      resultados[mes] = Number(asistencia.total_asistencias); // Convertir BigInt a Number
    });
    console.log(resultados)

    return { data: resultados }; // Retornar los datos al frontend
  } catch (error) {
    console.error('Error al obtener las asistencias:', error);

    return {
      statusCode: 500,
      body: { message: 'Hubo un error al procesar la solicitud.', error: error.message },
    };
  }
});
