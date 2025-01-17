<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from '../store';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

const store = useStore()
const router = useRouter()
let name = "";
try {
    name = store.user.displayName.split(" ");
} catch (error) { 
    console.log(error)
}

const logout = () => {
    router.push("/")
    store.user = null
    signOut(auth)
}
</script>

<template>
    <div class="header">
        <div class="header-content-main">
            <RouterLink to="/" class="header-content">
                <img src="/src/assets/logo.png" alt="FlickerPix Logo">
                <h2 class="logo-text">FlickerPix</h2>
            </RouterLink>
            <div class="header-content wide" v-if="!store.user">
                <RouterLink to="/register" class="button">Sign Up</RouterLink>
                <RouterLink to="/login" class="button">Sign In</RouterLink>
            </div>
            <form class="header-content wide" v-else>
                <p>{{ `Hi ${name[0]}! Ready to binge?` }}</p>
                <RouterLink to="/cart" class="button-alt"><img src="/src/assets/flickerpix_cart.png"
                        alt="Shopping cart"></RouterLink>
                <RouterLink to="/settings" class="button-alt"><img src="/src/assets/flickerpix_settings.png"
                        alt="Shopping cart"></RouterLink>
                <button class="button-alt" @click="logout()"><img src="/src/assets/flickerpix_logout.png"
                        alt="Shopping cart"></button>
            </form>
        </div>
    </div>
    <div class="break" />
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
}

p {
    font-size: 25px;
    color: beige;
}

.logo-text {
    color: beige;
    font-size: 30px;
    margin: 0px;
}

.header {
    background-image: linear-gradient(to right, rgb(10, 0, 41), rgb(0, 88, 52));
    width: 100%;
}

.header-content-main {
    width: 98%;
    align-items: center;
    padding: 10px;
    column-gap: 10px;
    justify-content: space-between;
}

.header-content {
    align-items: center;
    column-gap: 10px;
    display: flex;
    padding-right: 10px;
    align-items: center;
    text-decoration: none;
}

.button {
    color: rgb(236, 227, 119);
    background-color: rgb(0, 88, 52);
    border-color: rgb(236, 227, 119);
    border-style: outset;
    border-width: 2px;
    height: 25px;
    width: 90px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s;
}

.button:hover {
    background-color: rgb(0, 47, 53);
    text-decoration: underline;
}

.button-alt {
    background-color: rgb(0, 88, 52);
    border-color: rgb(236, 227, 119);
    border-style: outset;
    border-width: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
}

.button-alt:hover {
    background-color: rgb(0, 47, 53);
    cursor: pointer;
}

button {
    width: 36px;
    height: 36px;
}

.wide {
    column-gap: 20px;
}
</style>
