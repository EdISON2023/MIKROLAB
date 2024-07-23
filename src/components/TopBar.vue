<template>
  <nav class="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
    <div class="navbar-brand text-xl font-bold">
      MIKROMOVILAB
    </div>
  
    <div class="navbar-search flex items-center space-x-2 text-gray-700">
      <input
        type="text"
        placeholder="Buscar..."
        v-model="searchQuery"
        @keyup.enter="search"
        class="border rounded px-2 py-2 text-black"
      />
      <button @click="search" class="bg-white text-gray-700 px-2 py-2 rounded">
        <span class="material-icons">search</span>
      </button>
    </div>
  
    <div class="navbar-avatar relative">
      <img :src="avatarUrl" @click="toggleModal" class="w-10 h-10 rounded-full cursor-pointer" />
      <div v-if="isModalOpen" class="navbar-modal absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
        <ul>
          <li @click="editProfile" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Editar Perfil</li>
          <li @click="logout" class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cerrar Sesión</li>
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      avatarUrl: 'path//', // Cambia esto por la ruta de tu avatar
      isModalOpen: false,
    };
  },
  methods: {
    search() {
      console.log('Buscar:', this.searchQuery);
      // Lógica de búsqueda aquí
    },
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    editProfile() {
      this.$router.push({ name: 'EditarPerfil' });
      this.isModalOpen = false;
    },
    logout() {
      // Lógica para cerrar sesión aquí
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color:  rgb(31 41 55);
  color: var(--light);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: 1.5em;
}

.navbar-search {
  display: flex;
  align-items: center;
}

.navbar-search input {
  padding: 5px;
  margin-right: 5px;
}

.navbar-avatar img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.navbar-modal {
  position: absolute;
  right: 10px;
  top: 60px;
  background:  rgb(31 41 55);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navbar-modal ul {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.navbar-modal li {
  padding: 10px;
  cursor: pointer;
}

.navbar-modal li:hover {
  background: #07a135;
}
</style>
