<template>
  <div class="p-4 sm:p-8 bg-gray-100 min-h-screen w-full">
    <div class="bg-gray-800 text-white p-4 rounded-t-lg">
      <h1 class="text-xl">Gestor Mantenimiento</h1>
    </div>

    <div class="p-4 bg-white rounded-b-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <button @click="abrirModalNuevo" class="bg-green-500 text-white px-4 py-2 rounded">Nuevo Mantenimiento +</button>
        <input
          v-model="terminoBusqueda"
          @input="buscarMantenimientos"
          type="text"
          placeholder="Buscar..."
          class="border rounded px-4 py-2"
        />
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b">Id Mant.</th>
              <th class="py-2 px-4 border-b">Id Bicicleta</th>
              <th class="py-2 px-4 border-b">Fecha Inicio</th>
              <th class="py-2 px-4 border-b">Fecha Fin</th>
              <th class="py-2 px-4 border-b">Descripción</th>
              <th class="py-2 px-4 border-b">Estado</th>
              <th class="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mantenimiento, index) in mantenimientosPaginados" :key="index">
              <td class="py-2 px-4 border-b">{{ mantenimiento.idMantenimiento }}</td>
              <td class="py-2 px-4 border-b">{{ mantenimiento.idBicicleta }}</td>
              <td class="py-2 px-4 border-b">{{ mantenimiento.fechaInicio }}</td>
              <td class="py-2 px-4 border-b">{{ mantenimiento.fechaFin }}</td>
              <td class="py-2 px-4 border-b">{{ mantenimiento.descripcion }}</td>
              <td class="py-2 px-4 border-b">{{ mantenimiento.estado }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="abrirModalEditar(mantenimiento, index)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">✏️</button>
                <button @click="eliminarMantenimiento(index)" class="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="totalPages > 1" class="mt-4 flex justify-end">
        <button @click="paginaActual--" :disabled="paginaActual === 1" class="px-3 py-1 border rounded bg-gray-200 mx-1">‹</button>
        <button v-for="page in totalPages" :key="page" @click="paginaActual = page" :class="['px-3 py-1 border rounded mx-1', {'bg-blue-500 text-white': paginaActual === page, 'bg-gray-200': paginaActual !== page}]">{{ page }}</button>
        <button @click="paginaActual++" :disabled="paginaActual === totalPages" class="px-3 py-1 border rounded bg-gray-200 mx-1">›</button>
      </div>
      <!-- Modal para editar mantenimiento -->
      <div v-if="showModalEditar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded shadow-lg">
          <h2 class="text-xl mb-4">Editar Mantenimiento</h2>
          <form @submit.prevent="editarMantenimiento">
            <div class="mb-2">
              <label for="idBicicleta" class="block">Id Bicicleta</label>
              <input v-model="mantenimientoActual.idBicicleta" id="idBicicleta" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="fechaInicio" class="block">Fecha Inicio</label>
              <input v-model="mantenimientoActual.fechaInicio" id="fechaInicio" type="date" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="fechaFin" class="block">Fecha Fin</label>
              <input v-model="mantenimientoActual.fechaFin" id="fechaFin" type="date" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="descripcion" class="block">Descripción</label>
              <input v-model="mantenimientoActual.descripcion" id="descripcion" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="estado" class="block">Estado</label>
              <select v-model="mantenimientoActual.estado" id="estado" class="border rounded w-full py-1 px-2">
                <option>Terminado</option>
                <option>En Proceso</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button @click="cerrarModal" type="button" class="bg-red-600 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      </div>
      <!-- Modal para crear nuevo mantenimiento -->
      <div v-if="showModalNuevo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded shadow-lg">
          <h2 class="text-xl mb-4">Nuevo Mantenimiento</h2>
          <form @submit.prevent="agregarMantenimiento">
            <div class="mb-2">
              <label for="idBicicletaNuevo" class="block">Id Bicicleta</label>
              <input v-model="nuevoMantenimiento.idBicicleta" id="idBicicletaNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="fechaInicioNuevo" class="block">Fecha Inicio</label>
              <input v-model="nuevoMantenimiento.fechaInicio" id="fechaInicioNuevo" type="date" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="fechaFinNuevo" class="block">Fecha Fin</label>
              <input v-model="nuevoMantenimiento.fechaFin" id="fechaFinNuevo" type="date" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="descripcionNuevo" class="block">Descripción</label>
              <input v-model="nuevoMantenimiento.descripcion" id="descripcionNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="estadoNuevo" class="block">Estado</label>
              <select v-model="nuevoMantenimiento.estado" id="estadoNuevo" class="border rounded w-full py-1 px-2">
                <option>Terminado</option>
                <option>En Proceso</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button @click="cerrarModalNuevo" type="button" class="bg-red-600 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mantenimientos: [
        { idMantenimiento: 10, idBicicleta: 123, fechaInicio: '2024-10-22', fechaFin: '2024-10-28', descripcion: 'Revisión general', estado: 'Terminado' },
        // Otros mantenimientos
      ],
      nuevoMantenimientoId: 11,
      showModalEditar: false,
      showModalNuevo: false,
      mantenimientoActual: {
        idMantenimiento: null,
        idBicicleta: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
        estado: ''
      },
      nuevoMantenimiento: {
        idBicicleta: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
        estado: 'En Proceso'
      },
      terminoBusqueda: '',
      paginaActual: 1,
      elementosPorPagina: 10,
    };
  },
  computed: {
    mantenimientosFiltrados() {
      return this.mantenimientos.filter(mantenimiento =>
        Object.values(mantenimiento).some(val =>
          String(val).toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        )
      );
    },
    mantenimientosPaginados() {
      const start = (this.paginaActual - 1) * this.elementosPorPagina;
      const end = start + this.elementosPorPagina;
      return this.mantenimientosFiltrados.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.mantenimientosFiltrados.length / this.elementosPorPagina);
    }
  },
  methods: {
    abrirModalNuevo() {
      this.showModalNuevo = true;
    },
    cerrarModalNuevo() {
      this.showModalNuevo = false;
      this.resetearNuevoMantenimiento();
    },
    abrirModalEditar(mantenimiento, index) {
      this.mantenimientoActual = { ...mantenimiento };
      this.mantenimientoActual.index = index;
      this.showModalEditar = true;
    },
    cerrarModal() {
      this.showModalEditar = false;
      this.mantenimientoActual = {};
    },
    agregarMantenimiento() {
      const nuevoMant = { ...this.nuevoMantenimiento, idMantenimiento: this.nuevoMantenimientoId++ };
      this.mantenimientos.push(nuevoMant);
      this.cerrarModalNuevo();
    },
    editarMantenimiento() {
      Object.assign(this.mantenimientos[this.mantenimientoActual.index], this.mantenimientoActual);
      this.cerrarModal();
    },
    eliminarMantenimiento(index) {
      this.mantenimientos.splice(index, 1);
    },
    buscarMantenimientos() {
      this.paginaActual = 1;
    },
    resetearNuevoMantenimiento() {
      this.nuevoMantenimiento = {
        idBicicleta: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
        estado: 'En Proceso'
      };
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados, si es necesario */
</style>
