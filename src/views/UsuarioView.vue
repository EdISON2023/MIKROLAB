<template>
  <div class="p-4 sm:p-8 bg-gray-100 min-h-screen w-fit">
    <div class="bg-gray-800 text-white p-4 rounded-t-lg">
      <h1 class="text-xl">Gestor Usuarios</h1>
    </div>
    <div class="p-4 bg-white rounded-b-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <button @click="abrirModalNuevo" class="bg-green-500 text-white px-4 py-2 rounded">Nuevo Usuario +</button>
        <input
          v-model="terminoBusqueda"
          @input="buscarUsuarios"
          type="text"
          placeholder="Buscar..."
          class="border rounded px-4 py-2"
        />
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="py-2 px-4 border-b">Id Usuario</th>
              <th class="py-2 px-4 border-b">Nombres</th>
              <th class="py-2 px-4 border-b">Apellidos</th>
              <th class="py-2 px-4 border-b">Correo Electrónico</th>
              <th class="py-2 px-4 border-b">Contraseña</th>
              <th class="py-2 px-4 border-b">Dirección</th>
              <th class="py-2 px-4 border-b">Rol</th>
              <th class="py-2 px-4 border-b">Estado</th>
              <th class="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in usuariosPaginados" :key="index">
              <td class="py-2 px-4 border-b">{{ usuario.id }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.nombres }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.apellidos }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.email }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.contraseña }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.direccion }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.rol }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.estado }}</td>
              <td class="py-2 px-4 border-b">
                <button @click="abrirModalEditar(usuario, index)" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">✏️</button>
                <button @click="eliminarUsuario(index)" class="bg-red-500 text-white px-2 py-1 rounded">🗑️</button>
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

      <!-- Modal para editar usuario -->
      <div v-if="showModalEditar" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded shadow-lg">
          <h2 class="text-xl mb-4">Editar Usuario</h2>
          <form @submit.prevent="editarUsuario">
            <div class="mb-2">
              <label for="nombres" class="block">Nombres</label>
              <input v-model="usuarioActual.nombres" id="nombres" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="apellidos" class="block">Apellidos</label>
              <input v-model="usuarioActual.apellidos" id="apellidos" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="email" class="block">Correo Electrónico</label>
              <input v-model="usuarioActual.email" id="email" type="email" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="contraseña" class="block">Contraseña</label>
              <input v-model="usuarioActual.contraseña" id="contraseña" type="password" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="direccion" class="block">Dirección</label>
              <input v-model="usuarioActual.direccion" id="direccion" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="rol" class="block">Rol</label>
              <input v-model="usuarioActual.rol" id="rol" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="estado" class="block">Estado</label>
              <select v-model="usuarioActual.estado" id="estado" class="border rounded w-full py-1 px-2">
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button @click="cerrarModalEditar" type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal para crear nuevo usuario -->
      <div v-if="showModalNuevo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded shadow-lg">
          <h2 class="text-xl mb-4">Nuevo Usuario</h2>
          <form @submit.prevent="agregarUsuario">
            <div class="mb-2">
              <label for="nombresNuevo" class="block">Nombres</label>
              <input v-model="nuevoUsuario.nombres" id="nombresNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="apellidosNuevo" class="block">Apellidos</label>
              <input v-model="nuevoUsuario.apellidos" id="apellidosNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="emailNuevo" class="block">Correo Electrónico</label>
              <input v-model="nuevoUsuario.email" id="emailNuevo" type="email" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="contraseñaNuevo" class="block">Contraseña</label>
              <input v-model="nuevoUsuario.contraseña" id="contraseñaNuevo" type="password" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="direccionNuevo" class="block">Dirección</label>
              <input v-model="nuevoUsuario.direccion" id="direccionNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="rolNuevo" class="block">Rol</label>
              <input v-model="nuevoUsuario.rol" id="rolNuevo" type="text" class="border rounded w-full py-1 px-2">
            </div>
            <div class="mb-2">
              <label for="estadoNuevo" class="block">Estado</label>
              <select v-model="nuevoUsuario.estado" id="estadoNuevo" class="border rounded w-full py-1 px-2">
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div class="flex justify-end">
              <button @click="cerrarModalNuevo" type="button" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
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
      usuarios: [
        { id: 112, nombres: 'Hector', apellidos: 'Martinez', email: 'hm01@gmail.com', contraseña: '1234', direccion: 'Solan oe5', rol: 'Admin', estado: 'Inactivo' },
      ],
      nuevoUsuario: {
        id: null,
        nombres: '',
        apellidos: '',
        email: '',
        contraseña: '',
        direccion: '',
        rol: '',
        estado: ''
      },
      usuarioActual: {
        id: null,
        nombres: '',
        apellidos: '',
        email: '',
        contraseña: '',
        direccion: '',
        rol: '',
        estado: ''
      },
      nuevoUsuarioId: 113,
      showModalNuevo: false,
      showModalEditar: false,
      usuarioIndex: null,
      paginaActual: 1,
      elementosPorPagina: 10,
      terminoBusqueda: '',
      usuariosFiltrados: []
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.usuariosFiltrados.length / this.elementosPorPagina);
    },
    usuariosPaginados() {
      const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;
      return this.usuariosFiltrados.slice(inicio, fin);
    }
  },
  mounted() {
    this.buscarUsuarios(); // Inicializar usuariosFiltrados al montar el componente
  },
  methods: {
    abrirModalNuevo() {
      this.nuevoUsuario = { id: null, nombres: '', apellidos: '', email: '', contraseña: '', direccion: '', rol: '', estado: '' };
      this.showModalNuevo = true;
    },
    cerrarModalNuevo() {
      this.showModalNuevo = false;
    },
    abrirModalEditar(usuario, index) {
      this.usuarioIndex = index + (this.paginaActual - 1) * this.elementosPorPagina;
      this.usuarioActual = { ...usuario };
      this.showModalEditar = true;
    },
    cerrarModalEditar() {
      this.showModalEditar = false;
    },
    agregarUsuario() {
      this.nuevoUsuario.id = this.nuevoUsuarioId++;
      this.usuarios.push({ ...this.nuevoUsuario });
      this.cerrarModalNuevo();
      this.buscarUsuarios(); // Actualizar la lista de usuarios filtrados
    },
    editarUsuario() {
      this.usuarios[this.usuarioIndex] = { ...this.usuarioActual };
      this.cerrarModalEditar();
      this.buscarUsuarios(); // Actualizar la lista de usuarios filtrados
    },
    eliminarUsuario(index) {
      const actualIndex = index + (this.paginaActual - 1) * this.elementosPorPagina;
      this.usuarios.splice(actualIndex, 1);
      this.buscarUsuarios(); // Actualizar la lista de usuarios filtrados
      if (this.usuariosPaginados.length === 0 && this.paginaActual > 1) {
        this.paginaActual--;
      }
    },
    buscarUsuarios() {
      const termino = this.terminoBusqueda.toLowerCase();
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.nombres.toLowerCase().includes(termino) ||
        usuario.apellidos.toLowerCase().includes(termino) ||
        usuario.email.toLowerCase().includes(termino) ||
        usuario.direccion.toLowerCase().includes(termino) ||
        usuario.rol.toLowerCase().includes(termino) ||
        usuario.estado.toLowerCase().includes(termino)
      );
      this.paginaActual = 1;
    }
  }
}
</script>

<style scoped>
</style>
