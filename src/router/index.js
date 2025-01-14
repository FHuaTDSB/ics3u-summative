import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import RegisterView from '../views/RegisterView.vue';
import DetailsView from '../views/DetailsView.vue';
import CartView from '../views/CartView.vue';
import SettingsView from '../views/SettingsView.vue';
import ErrorView from '@/views/ErrorView.vue';
import { useStore, userAuthorised } from '@/store';
import { storeToRefs } from 'pinia';

const routes = [
  { path: '/', meta: { auth: false }, component: HomeView, },
  { path: '/register', meta: { auth: false }, component: RegisterView },
  { path: '/login', meta: { auth: false }, component: LoginView },
  { path: '/movies', meta: { auth: true }, component: MoviesView },
  { path: '/movies/:id', meta: { auth: true }, component: DetailsView },
  { path: '/cart', meta: { auth: true }, component: CartView },
  { path: '/settings', meta: { auth: true }, component: SettingsView },
  { path: '/:pathMatch(.*)*', meta: { auth: false }, component: ErrorView, }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  userAuthorised.then(() => {
    next();
  })
    .catch(error => {
      const store = useStore()
      console.log(error)
      if (!store.user && to.meta.auth) {
        next("/login");
      } else {
        next();
      }
    })
});

export default router
