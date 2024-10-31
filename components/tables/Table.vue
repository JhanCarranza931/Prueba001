<script setup>

 const actividadesStore = new useActividadStore()

 const actividades = computed(()=> actividadesStore.actividades)

 const fechActividades = async ()=>{
    await actividadesStore.fetchActividades();
 }
 onMounted(fechActividades)
 console.log('Actividades: ',actividades)
</script>

<template>
    <div>
    <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 ml-6">Actividades</h2>
        <h1 v-for=" actividad in actividades">
            {{ actividad.usuario.nombre+' '+actividad.usuario.apellido}}
        </h1>


    </div>

    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 ">
                    <table class="min-w-full divide-y divide-gray-200 ">
                        <thead class="bg-gray-50 ">
                            <tr>
                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                    <div class="flex items-center gap-x-3">
                                        <span>Nombre</span>
                                    </div>
                                </th>

                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                        <span>Estado</span>
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        <span>Actividad</span>
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">Fecha</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200  ">
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                       

                                        <div class="flex items-center gap-x-2">
                                            <img class="object-cover w-10 h-10 rounded-full" src="https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-3.jpg" alt="">
                                            <div>
                                                <h2 class="font-medium text-gray-800  ">Jack Troncos</h2>
                                                <p class="text-sm font-normal text-gray-600 ">jack@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 ">
                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                        <h2 class="text-sm font-normal text-emerald-500">Active</h2>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Optimizar el rendimiento del sitio</td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">19/10/2024</td>
                                
                               

                            </tr>
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                       

                                        <div class="flex items-center gap-x-2">
                                            <img class="object-cover w-10 h-10 rounded-full" src="https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-3.jpg" alt="">
                                            <div>
                                                <h2 class="font-medium text-gray-800  ">Jack Troncos</h2>
                                                <p class="text-sm font-normal text-gray-600 ">jack@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 ">
                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                        <h2 class="text-sm font-normal text-emerald-500">Active</h2>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Optimizar el rendimiento del sitio</td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">19/10/2024</td>
                                
                               

                            </tr>
                          
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                     
                                        <div class="flex items-center gap-x-2">
                                            <img class="object-cover w-10 h-10 rounded-full" src="https://pstangarana.com/wp-content/uploads/2023/09/jh.webp" alt="">
                                            <div>
                                                <h2 class="font-medium text-gray-800  ">Jhan Carranza</h2>
                                                <p class="text-sm font-normal text-gray-600 ">jhan@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 ">
                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                        <h2 class="text-sm font-normal text-emerald-500">Active</h2>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Diseño UI web </td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">22/10/2024</td>
                                
                               

                            </tr>
                            <tr>
                                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center gap-x-3">
                                      
                                        <div class="flex items-center gap-x-2">
                                            <img class="object-cover w-10 h-10 rounded-full" src="https://pstangarana.com/wp-content/uploads/2024/07/BECADO-g-SN-1-1.jpg" alt="">
                                            <div>
                                                <h2 class="font-medium text-gray-800  ">Arthur Melo</h2>
                                                <p class="text-sm font-normal text-gray-600 ">@authurmelo</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 ">
                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                        <h2 class="text-sm font-normal text-emerald-500">Active</h2>
                                    </div>
                                </td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">Diseño de la base de datos</td>
                                <td class="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">22/10/2024</td>
                                
                               

                            </tr>
                            

                            


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</div>
</template>