<template>
    <div class="flex flex-col p-6">
     <!-- Skeleton Loader: Esto se muestra mientras se están cargando las actividades -->
     <div  class="flex justify-between gap-10 items-center border-b pb-2 animate-pulse">
      <!-- Avatar skeleton -->
      <div class="flex items-center space-x-4">
        <div class="bg-gray-300 rounded-full h-8 w-8"></div>
        <div class="space-y-2">
          <div class="bg-gray-300 h-4 w-32 rounded"></div>
          <div class="bg-gray-300 h-3 w-24 rounded"></div>
        </div>
      </div>
      <!-- Status skeleton -->
      <div class="bg-gray-300 h-6 w-24 rounded-full"></div>
    </div>
      <div  class="mt-4">
        <div>
            <div class="bg-gray-300 h-4 w-32 rounded"></div>
            <div class="bg-gray-300 h-3 w-48 rounded mt-2"></div>
        </div>
      
    </div>
</div>
</template>