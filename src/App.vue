<template>
	<div class="app">
	  <NavBar/>
	  <div class="main-content">
		<SideBar />
		<main>
		  <router-view />
		</main>
	  </div>
	</div>
  </template>
  
  <script setup>
  import NavBar from './components/TopBar.vue';
  import SideBar from './components/NavBar.vue';
  </script>
  
  <style lang="scss">
  :root {
	--primary: #4ade80;
	--primary-alt: #22c55e;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
	--sidebar-width: 300px;
  }
  
  * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira Sans', sans-serif;
  }
  
  body {
	background: var(--light);
  }
  
  button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
  }
  
  .app {
	display: flex;
	flex-direction: column;
  }
  
  .main-content {
	display: flex;
	flex: 1 1 0;
  }
  
  main {
	flex: 1;
	padding: 2rem;
	margin-left: var(--sidebar-width);
	margin-top: 60px; /* Ajustar según la altura del navbar */
  
	@media (max-width: 1024px) {
	  padding-left: 6rem;
	  margin-left: 6rem; /* Ajustar margen en pantallas pequeñas */
	}
  }
  </style>
  