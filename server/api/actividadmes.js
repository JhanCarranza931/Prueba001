// server/api/actividades.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { year } = getQuery(event); 


    if (!year || isNaN(year)) {
      return { statusCode: 400, body: { message: 'El parámetro "year" debe ser un número válido.' } };
    }


    const asistencias = await prisma.$queryRaw`
      SELECT 
        EXTRACT(MONTH FROM "hora_entrada") AS mes, 
        COUNT(id) AS total_asistencias
      FROM "Asistencias" 
      WHERE "hora_entrada" >= ${new Date(`${year}-01-01`)}
        AND "hora_entrada" < ${new Date(`${parseInt(year) + 1}-01-01`)}
      GROUP BY mes
      ORDER BY mes;
    `;

 
    const resultados = Array(12).fill(0);


    asistencias.forEach((asistencia) => {
      const mes = parseInt(asistencia.mes, 10) - 1; 
      resultados[mes] = Number(asistencia.total_asistencias); 
    });
    console.log(resultados)

    return { data: resultados }; 
  } catch (error) {
    console.error('Error al obtener las asistencias:', error);

    return {
      statusCode: 500,
      body: { message: 'Hubo un error al procesar la solicitud.', error: error.message },
    };
  }
});
