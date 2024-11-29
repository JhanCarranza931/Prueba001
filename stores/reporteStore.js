import { defineStore } from "pinia";
import { format, parseISO } from "date-fns";

export const useReporteStore = defineStore("reporte", {
  state: () => ({
    asistencias: [],
  }),
  actions: {
    async fetchAsistencias() {
      try {
        const response = await $fetch("/api/asisreport");
        if (!Array.isArray(response)) {
          throw new Error("Formato de respuesta no válido");
        }
        this.asistencias = response;
      } catch (error) {
        console.error("Error al obtener asistencias:", error.message);
        this.asistencias = []; // Limpia el estado en caso de error
        throw new Error(
          "No se pudo cargar el reporte de asistencias. Intente nuevamente."
        );
      }
    },
    async procesarAsistencias(fechaInicio, fechaFin, dni) {
      try {
        // Verificar que las fechas sean válidas
        if (!fechaInicio || !fechaFin) {
          throw new Error("Las fechas de inicio y fin son necesarias.");
        }

        // Convertir las fechas a objetos Date en formato ISO
        const startDate = new Date(fechaInicio).setHours(0, 0, 0, 0); // Inicio del día
        const endDate = new Date(fechaFin).setHours(23, 59, 59, 999); // Fin del día

        // Verificar que las fechas sean válidas
        if (isNaN(startDate) || isNaN(endDate)) {
          throw new Error("Las fechas de inicio o fin no son válidas.");
        }

        const asistenciasEnRango = this.asistencias.filter((item) => {
          // Verificar que item.hora_entrada sea válido
          if (!item.hora_entrada) {
            console.log("hora_entrada no está definida para el item", item);
            return false;
          }

          // Asegurarnos de que hora_entrada está en formato ISO o convertible
          const horaEntrada = parseISO(item.hora_entrada); // Convertir la cadena a una fecha válida
          if (isNaN(horaEntrada)) {
            console.log("Fecha de hora_entrada no válida:", item.hora_entrada);
            return false; // Si la hora de entrada no es válida, lo excluimos
          }

          // Verificar si la hora de entrada está dentro del rango
          const estaEnRango =
            horaEntrada >= startDate && horaEntrada <= endDate;

          // Si se proporcionó un DNI, filtrar también por el DNI
          const coincideDni = dni ? item.usuario?.dni === dni : true;

          return estaEnRango && coincideDni;
        });

        console.log(
          "Asistencias dentro del rango y DNI (si aplica):",
          asistenciasEnRango
        );

        return asistenciasEnRango.map((item) => {
          // Convertir hora_salida a formato Date y calcular las horas trabajadas
          const horaSalida = item.hora_salida
            ? new Date(item.hora_salida)
            : null;

          const horasTrabajadas = horaSalida
            ? (
                (horaSalida - new Date(item.hora_entrada)) /
                (1000 * 60 * 60)
              ).toFixed(2)
            : "N/A"; // Si no hay hora de salida, muestra "N/A"

          return {
            id: item.id,
            nombre: `${item.usuario.nombre} ${item.usuario.apellido}`,
            dni: item.usuario.dni || "No registrado",
            hora_entrada: item.hora_entrada
              ? format(new Date(item.hora_entrada), "yyyy-MM-dd HH:mm:ss")
              : "No registrada",
            hora_salida: horaSalida
              ? format(horaSalida, "yyyy-MM-dd HH:mm:ss")
              : "No registrada",
            horas_trabajadas: horasTrabajadas,
            estado: item.estadoAsis?.stado_asis || "No asignado",
          };
        });
      } catch (error) {
        console.error("Error al procesar asistencias:", error.message);
        throw new Error(
          "Hubo un problema al procesar los datos. Intente nuevamente."
        );
      }
    },
  },
});
