<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
	  <div class="logo">
		<img :src="logoURL" alt="Vue" /> 
	  </div>
  
	  <div class="menu-toggle-wrap">
		<button class="menu-toggle" @click="ToggleMenu">
		  <span class="material-icons">keyboard_double_arrow_right</span>
		</button>
	  </div>
  
	  <h3>Menu</h3>
	  <div class="menu">
		<router-link to="/" class="button">
		  <span class="material-icons">home</span>
		  <span class="text">Home</span>
		</router-link>
		<router-link to="/usuario" class="button">
		  <span class="material-icons">group</span>
		  <span class="text">Usuario</span>
		</router-link>
		<router-link to="/rol" class="button">
		  <span class="material-icons">engineering</span>
		  <span class="text">Rol</span>
		</router-link>
		<router-link to="/alquiler" class="button">
		  <span class="material-icons">description</span>
		  <span class="text">Alquiler</span>
		</router-link>
		<router-link to="/bicicleta" class="button">
		  <span class="material-icons">pedal_bike</span>
		  <span class="text">Bicicleta</span>
		</router-link>
		<router-link to="/estaciones" class="button">
		  <span class="material-icons">warehouse</span>
		  <span class="text">Estaciones</span>
		</router-link>
		<router-link to="/mantenimiento" class="button">
		  <span class="material-icons">construction</span>
		  <span class="text">Mantenimiento</span>
		</router-link>
		<router-link to="/viajes" class="button">
		  <span class="material-icons">map</span>
		  <span class="text">Viajes</span>
		</router-link>
	  </div>
  
	  <div class="flex"></div>
  
	  <div class="menu">
		
		<router-link to="/login" class="button">
		  <span class="text">Login</span>
		</router-link>
	  </div>
	</aside>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import logoURL from '../assets/logo.png';
  
  const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
  
  const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value;
	localStorage.setItem("is_expanded", is_expanded.value);
  };
  </script>
  
  <style lang="scss" scoped>
  aside {
	display: flex;
	flex-direction: column;
	background-color: rgb(31 41 55);
	color: var(--light);
	width: calc(2rem + 32px);
	overflow: hidden;
	height: calc(100vh - 60px);
	padding: 1rem;
	position: fixed;
	top: 60px;
	left: 0;
	transition: 0.2s ease-in-out;
  
	.flex {
	  flex: 1 1 0%;
	}
  
	.logo {
	  margin-bottom: 1rem;
	  img {
		width: 2rem;
	  }
	}
  
	.menu-toggle-wrap {
	  display: flex;
	  justify-content: flex-end;
	  margin-bottom: 1rem;
	  position: relative;
	  top: 0;
	  transition: 0.2s ease-in-out;
	  .menu-toggle {
		transition: 0.2s ease-in-out;
		.material-icons {
		  font-size: 2rem;
		  color: var(--light);
		  transition: 0.2s ease-out;
		}
		&:hover {
		  .material-icons {
			color: var(--primary);
			transform: translateX(0.5rem);
		  }
		}
	  }
	}
  
	h3, .button .text {
	  opacity: 0;
	  transition: opacity 0.3s ease-in-out;
	}
  
	h3 {
	  color: var(--grey);
	  font-size: 0.875rem;
	  margin-bottom: 0.5rem;
	  text-transform: uppercase;
	}
  
	.menu {
	  margin: 0 -1rem;
	  .button {
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: 0.2s ease-in-out;
		padding: 0.5rem 1rem;
		.material-icons {
		  font-size: 2rem;
		  color: var(--light);
		  transition: 0.2s ease-in-out;
		}
		.text {
		  color: var(--light);
		  transition: 0.2s ease-in-out;
		}
		&:hover {
		  background-color: var(--dark-alt);
		  .material-icons, .text {
			color: var(--primary);
		  }
		}
		&.router-link-exact-active {
		  background-color: var(--dark-alt);
		  border-right: 5px solid var(--primary);
		  .material-icons, .text {
			color: var(--primary);
		  }
		}
	  }
	}
  
	.footer {
	  opacity: 0;
	  transition: opacity 0.3s ease-in-out;
	  p {
		font-size: 0.875rem;
		color: var(--grey);
	  }
	}
  
	&.is-expanded {
	  width: var(--sidebar-width);
	  .menu-toggle-wrap {
		top: -3rem;
		.menu-toggle {
		  transform: rotate(-180deg);
		}
	  }
	  h3, .button .text {
		opacity: 1;
	  }
	  .button {
		.material-icons {
		  margin-right: 1rem;
		}
	  }
	  .footer {
		opacity: 1;
	  }
	}
  
	@media (max-width: 1024px) {
	  position: absolute;
	  z-index: 99;
	}
  }
  </style>
  