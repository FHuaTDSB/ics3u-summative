import { defineStore } from 'pinia'
import { ref } from 'vue';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const useStore = defineStore('store', () => {
  const email = ref("");
  const cart = ref(new Map());
  const userInfo = ref({ firstName: null, lastName: null, email: null, password: null })

  return { userInfo, email, cart };
})

export const userAuthorised = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user
      const storedCart = localStorage.getItem(`cart_${store.user.email}`);

      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map;
      resolve();
    } catch (error) {
      reject();
    }
  })
})