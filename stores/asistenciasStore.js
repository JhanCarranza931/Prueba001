import { defineStore } from 'pinia'

export const useAsistenciasStore = defineStore('asistencias', {
    state: () => ({
        asistencias:null
      }),

      actions:{
        async  addAsistencia(data) {
            const response = await $fetch('/api/asistencia',{
                method:'POST',
                body: JSON.stringify(data)
            })
            return response
            
          }
      }
      
})