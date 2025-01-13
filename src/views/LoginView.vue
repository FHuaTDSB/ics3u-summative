<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '@/store';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const router = useRouter();
const email = ref("");
const password = ref("");
const store = useStore();

const loginByEmail = async () => {
    try {
        const user = ((await signInWithEmailAndPassword(auth, email.value, password.value)).user);
        store.user = user;
        router.push("/movies");
    } catch (error) {
        alert("Couldn't log in with email!");
    }
}

const loginWithGoogle = async () => {
    try {
        const user = ((await signInWithPopup(auth, new GoogleAuthProvider)).user);
        store.user = user;
        router.push("/movies");
    } catch (error) {
        alert("Couldn't log in with Google!");
    }
}
</script>

<template>
    <Header />
    <div class="login">
        <div class="login-window">
            <form @submit.prevent="loginByEmail()">
                <label class="title">Welcome back!</label>
                <div class="form-component">
                    <label>Email:</label>
                    <input type="email" v-model:="email" class="login-input" required>
                </div>
                <div class="form-component">
                    <label>Password:</label>
                    <input v-model:="password" type="password" class="login-input" required>
                </div>
                <button type="submit" class="button">Sign In</button>
            </form>
            <button class="button2" @click="loginWithGoogle()">Log in with Google!</button>
            <RouterLink to="/register" class="link">Don't have an account? Sign up!</RouterLink>
        </div>
    </div>
    <div class="break" />
    <Footer />
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
}

label {
    font-size: 20px;
}

.login-window {
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
    height: 500px;
    width: 500px;
    margin-top: 5%;
    justify-content: center;
}

.link {
    margin-top: 20px;
}

.login-input {
    width: 100%;
    height: 20px;
    border-color: rgb(192, 246, 255);
    border-width: 3px;
}

.login {
    height: 726px;
    width: 100%;
    background-image: url(/src/assets/flickerpix_login.png);
    flex-direction: column;
}

.form-component {
    flex-direction: column;
    align-items: center;
    width: 85%;
    margin: 10px;
}

.title {
    font-size: 40px;
    text-decoration: underline;
    padding-bottom: 20px;
}

.button {
    background-color: aliceblue;
    color: black;
    border-color: rgb(192, 246, 255);
    border-style: inset;
    border-width: 3px;
    height: 40px;
    width: 150px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.1s;
    margin-top: 20px;
}

.button:hover {
    background-color: rgb(192, 246, 255);
    text-decoration: underline;
    cursor: pointer;
}

.button2 {
    background-color: aliceblue;
    color: black;
    border-color: rgb(192, 246, 255);
    border-style: inset;
    border-width: 3px;
    height: 30px;
    width: 200px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.1s;
    margin-top: 20px;
}

.button2:hover {
    background-color: rgb(192, 246, 255);
    text-decoration: underline;
    cursor: pointer;
}
</style>
