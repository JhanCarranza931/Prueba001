import { format, addHours } from "date-fns";

export const useReporteActividadesStore = defineStore("reporteActividades", {
  state: () => ({
    actividades: [],
  }),
  actions: {
    async fetchActividades() {
      try {
        const response = await $fetch("/api/actividadreport");
        this.actividades = response;
      } catch (error) {
        console.error("Error al obtener actividades:", error.message);
        this.actividades = [];
        throw new Error("No se pudo cargar el reporte de actividades. Intente nuevamente.");
      }
    },
    async procesarActividades(fechaInicio, fechaFin, dni) {
      try {
        if (!fechaInicio || !fechaFin) {
          throw new Error("Las fechas de inicio y fin son necesarias.");
        }
    
        // Ajustar las fechas al horario local de Perú (+5 horas UTC)
        const adjustToPeruTimezone = (dateString) =>
          addHours(new Date(dateString), 5);
    
        const startDate = adjustToPeruTimezone(`${fechaInicio}T00:00:00`);
        const endDate = adjustToPeruTimezone(`${fechaFin}T23:59:59`);
    
        console.log("Fecha inicio ajustada:", startDate);
        console.log("Fecha fin ajustada:", endDate);
    
        // Filtrar actividades dentro del rango y por DNI si se proporciona
        const actividadesEnRango = this.actividades.filter((item) => {
          if (!item.fecha) return false;
    
          const fechaActividad = adjustToPeruTimezone(item.fecha);
    
          // Verificar si la actividad está dentro del rango de fechas
          const estaEnRango = fechaActividad >= startDate && fechaActividad <= endDate;
    
          // Verificar si coincide el DNI si se proporciona
          const coincideDni = dni ? item.usuario?.dni === dni : true;
    
          return estaEnRango && coincideDni;
        });
    
        console.log("Actividades dentro del rango y DNI (si aplica):", actividadesEnRango);
    
        return actividadesEnRango.map((item) => ({
          id: item.id,
          actividad: item.actividad,
          fecha: item.fecha
            ? format(adjustToPeruTimezone(item.fecha), "yyyy-MM-dd HH:mm:ss")
            : "No registrada",
          usuario: item.usuario
            ? `${item.usuario.nombre} ${item.usuario.apellido}`
            : "Usuario desconocido",
          dni: item.usuario?.dni || "No registrado",
          estado: item.estado?.stado_actividad || "No asignado",
        }));
      } catch (error) {
        console.error("Error al procesar actividades:", error.message);
        throw new Error("Hubo un problema al procesar los datos. Intente nuevamente.");
      }
    }
    
  },
});
