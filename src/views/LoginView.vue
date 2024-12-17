<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const email = ref("");
const password = ref("");

const login = () => {
    if (password.value == "123") {
        router.push("/movies");
    }
    else {
        alert("Invalid email or password");
    }
}
</script>

<template>
    <Header />
    <div class="login">
        <form @submit.prevent="login">
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
            <RouterLink to="/register" class="link">Don't have an account? Sign up!</RouterLink>
        </form>
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
    background-color: aliceblue;
    height: 500px;
    width: 500px;
    margin-top: 5%;
    justify-content: center;
}

label {
    font-size: 20px;
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
</style>
