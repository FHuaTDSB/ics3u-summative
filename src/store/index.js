import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useStore = defineStore('store', () => {
  const email = ref("");
  const cart = ref(new Map());
  const userInfo = ref({ firstName: "", lastName: "", email: "", password: "", loggedIn: false });

  return { email, cart, userInfo };
})
