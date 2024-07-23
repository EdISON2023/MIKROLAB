import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home
		},
	
		{
			path: '/alquiler',
			component: () => import('../views/AlquilerView.vue')
		},
		{
			path: '/estaciones',
			component: () => import('../views/Estaciones.View.vue')
		},
		{
			path: '/usuario',
			component: () => import('../views/UsuarioView.vue')
		},
		{
			path: '/bicicleta',
			component: () => import('../views/BicicletaView.vue')
		},
	
		{
			path: '/mantenimiento',
			component: () => import('../views/MantenimientoView.vue')
		},
		{
			path: '/rol',
			component: () => import('../views/RolView.vue')
		},
		{
			path: '/viajes',
			component: () => import('../views/ViajesView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView
		  },
	
	],
})

export default router