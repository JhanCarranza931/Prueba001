import { defineStore } from 'pinia'

export const useAsistenciasStore = defineStore('asistencias', {
    state: () => ({
        asistencias:null
      }),

      actions:{
        async fetchAsistencia(){
          this.asistencias = await $fetch('/api/asistencia',{
            method:'GET'
          })
        },
        async  addAsistencia(data) {
            const response = await $fetch('/api/asistencia',{
                method:'POST',
                body: JSON.stringify(data)
            })
            return response
            
          },

        async aditAsistencia(data){
          const response = await $fetch('/api/asistencia',{
            method:'PUT',
            body:JSON.stringify(data)
          })
          return response
        }
      }
      
})