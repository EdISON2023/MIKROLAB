<template>
    <div class="p-4 sm:p-8 bg-gray-100 min-h-screen min-w-screen">
      <div class="bg-gray-800 text-white p-4 rounded-t-lg">
        <h1 class="text-xl">Gestor Roles</h1>
      </div>
  
      <div class="p-4 bg-white rounded-b-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <button @click="abrirModalNuevo" class="bg-green-500 text-white px-4 py-2 rounded">Nuevo Rol +</button>
          <input
            v-model="terminoBusqueda"
            @input="buscarRoles"
            type="text"
            placeholder="Buscar..."
            class="border rounded px-4 py-2"
          />
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr class="bg-gray-100">
                <th class="py-2 px-4 border-b">Id Rol</th>
                <th class="py-2 px-4 border-b">Nombre</th>
                <th class="py-2 px-4 border-b">Descripción</th>
                <th class="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rol, index) in rolesPaginados" :key="index">
                <td class="py-2 px-4 border-b">{{ rol.idRol }}</td>
                <td class="py-2 px-4 border-b">{{ rol.nombre }}</td>
                <td class="py-2 px-4 border-b">{{ rol.descripcion }}</td>
                <td class="py-2 px-4 border-b">
                  <button @click="abrirModalEditar(rol, index)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">✏️</button>
                  <button @click="eliminarRol(index)" class="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
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
        <!-- Modal para editar rol -->
        <div v-if="showModalEditar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-xl mb-4">Editar Rol</h2>
            <form @submit.prevent="editarRol">
              <div class="mb-2">
                <label for="nombre" class="block">Nombre</label>
                <input v-model="rolActual.nombre" id="nombre" type="text" class="border rounded w-full py-1 px-2">
              </div>
              <div class="mb-2">
                <label for="descripcion" class="block">Descripción</label>
                <input v-model="rolActual.descripcion" id="descripcion" type="text" class="border rounded w-full py-1 px-2">
              </div>
              <div class="flex justify-end">
                <button @click="cerrarModal" type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
        <!-- Modal para crear nuevo rol -->
        <div v-if="showModalNuevo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-xl mb-4">Nuevo Rol</h2>
            <form @submit.prevent="agregarRol">
              <div class="mb-2">
                <label for="nombreNuevo" class="block">Nombre</label>
                <input v-model="nuevoRol.nombre" id="nombreNuevo" type="text" class="border rounded w-full py-1 px-2">
              </div>
              <div class="mb-2">
                <label for="descripcionNuevo" class="block">Descripción</label>
                <input v-model="nuevoRol.descripcion" id="descripcionNuevo" type="text" class="border rounded w-full py-1 px-2">
              </div>
              <div class="flex justify-end">
                <button @click="cerrarModalNuevo" type="button" class="bg-red-600 text-white px-4 py-2 rounded mr-2">Cancelar</button>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
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
        roles: [
          { idRol: 1, nombre: 'Admin', descripcion: 'Administrador del sistema' },
          { idRol: 2, nombre: 'Usuario', descripcion: 'Usuario del sistema' },
          // Otros roles
        ],
        nuevoRolId: 3,
        showModalEditar: false,
        showModalNuevo: false,
        rolActual: {
          idRol: null,
          nombre: '',
          descripcion: ''
        },
        nuevoRol: {
          nombre: '',
          descripcion: ''
        },
        rolIndex: null,
        paginaActual: 1,
        elementosPorPagina: 8,
        terminoBusqueda: '',
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.filtrarRoles().length / this.elementosPorPagina);
      },
      rolesPaginados() {
        const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
        const fin = inicio + this.elementosPorPagina;
        return this.filtrarRoles().slice(inicio, fin);
      }
    },
    methods: {
      abrirModalNuevo() {
        this.showModalNuevo = true;
      },
      cerrarModalNuevo() {
        this.showModalNuevo = false;
      },
      agregarRol() {
        const nuevoRol = {
          idRol: this.nuevoRolId++,
          ...this.nuevoRol
        };
        this.roles.push(nuevoRol);
        this.nuevoRol = {
          nombre: '',
          descripcion: ''
        };
        this.cerrarModalNuevo();
      },
      abrirModalEditar(rol, index) {
        this.rolActual = { ...rol };
        this.rolIndex = index + (this.paginaActual - 1) * this.elementosPorPagina;
        this.showModalEditar = true;
      },
      cerrarModal() {
        this.showModalEditar = false;
      },
      editarRol() {
        this.roles[this.rolIndex] = { ...this.rolActual };
        this.cerrarModal();
      },
      eliminarRol(index) {
        const actualIndex = index + (this.paginaActual - 1) * this.elementosPorPagina;
        this.roles.splice(actualIndex, 1);
        if (this.rolesPaginados.length === 0 && this.paginaActual > 1) {
          this.paginaActual--;
        }
      },
      buscarRoles() {
        this.paginaActual = 1;
      },
      filtrarRoles() {
        if (this.terminoBusqueda === '') {
          return this.roles;
        }
        const termino = this.terminoBusqueda.toLowerCase();
        return this.roles.filter(rol => 
          rol.nombre.toLowerCase().includes(termino) ||
          rol.descripcion.toLowerCase().includes(termino)
        );
      }
    }
  }
  </script>
<style scoped>
</style>
    