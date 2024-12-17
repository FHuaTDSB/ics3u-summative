import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import RegisterView from '../views/RegisterView.vue';
import DetailsView from '../views/DetailsView.vue';
import CartView from '../views/CartView.vue';
import SettingsView from '../views/SettingsView.vue';
import ErrorView from '@/views/ErrorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
    { path: '/movies', component: MoviesView },
    { path: '/movies/:id', component: DetailsView },
    { path: '/cart', component: CartView },
    { path: '/settings', component: SettingsView },
    { path: '/:pathMatch(.*)*', component: ErrorView, }
  ],
})

export default router
