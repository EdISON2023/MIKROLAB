<template>
	<div class="p-4 sm:p-8 bg-gray-100 min-h-screen w-full">
		<div class="bg-gray-800 text-white p-4 rounded-t-lg">
			<h1 class="text-xl">Sistema de Alquiler </h1>
		  </div>
	  <div class="grid grid-cols-4 gap-4 p-4">
	
		<div class="bg-orange-500 text-white p-4 rounded shadow">
		  <div class="flex justify-between items-center">
			<div>
			  <h2 class="text-2xl">{{ usuariosRegistrados }}</h2>
			  <p> Usuarios Registrados</p>
			</div>
				<span class="material-icons">group</span>
		  </div>
		  <a href="/usuario" class="block text-sm mt-2 underline">View Details</a>
		</div>
		<div class="bg-blue-500 text-white p-4 rounded shadow">
		  <div class="flex justify-between items-center">
			<div>
			  <h2 class="text-2xl">{{viajesRegistrados  }}</h2>
			  <p> Viajes Registrados</p>
			</div>
			<span class="material-icons">map</span>
		  </div>
		  <a href="/viajes" class="block text-sm mt-2 underline">View Details</a>
		</div>
		<div class="bg-teal-500 text-white p-4 rounded shadow">
		  <div class="flex justify-between items-center">
			<div>
			  <h2 class="text-2xl">{{ alquileresRegistrados}}</h2>
			  <p>Alquileres Registrdos</p>
			</div>
			<span class="material-icons">description</span>
		  </div>
		  <a href="/alquiler" class="block text-sm mt-2 underline">View Details</a>
		</div>
		<div class="bg-red-500 text-white p-4 rounded shadow">
		  <div class="flex justify-between items-center">
			<div>
			  <h2 class="text-2xl">{{ estacionesUso }}</h2>
			  <p>Estaciones en Uso</p>
			</div>
			<span class="material-icons">warehouse</span>
		  </div>
		  <a href="/estaciones" class="block text-sm mt-2 underline">View Details</a>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		usuariosRegistrados: 0,
		viajesRegistrados: 0,
		alquileresRegistrados: 0,
		estacionesUso: 0,
	  };
	},
	created() {
	  this.fetchStatistics();
	},
	methods: {
	  fetchStatistics() {
		// Simulando una solicitud API para obtener estadísticas
		setTimeout(() => {
		  this.totalUsuarios = 21;
		  this.totalViajes = 23;
		  this.viajesTerminados = 2;
		  this.viajesEnRiesgo = 1;
		}, 1000);
	  },
	},
  };
  </script>
  
  <style scoped>
  /* Agrega aquí estilos personalizados si es necesario */
  </style>
  