<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';

const router = useRouter();
const userInfo = ref({ firstName: "", lastName: "", email: "", password: "", rePassword: "" });
const store = useStore();

async function registerbyEmail() {
    try {
        const user = (await createUserWithEmailAndPassword(auth, userInfo.value.email, userInfo.value.password)).user;
        await updateProfile(user, { displayName: `${userInfo.value.firstName}` `${userInfo.value.lastName}` });
        store.user = user;
        router.push("/movies");
    } catch (error) {
        alert("There was an error creating a user with email!")
    }
}
</script>

<template>
    <Header />
    <div class="register">
        <form @submit.prevent="registerbyEmail()">
            <label class="title">Join FlickerPix!</label>
            <div class="names">
                <div class="form-component">
                    <label>First Name:</label>
                    <input class="register-input" v-model="userInfo.firstName" required>
                </div>
                <div class="form-component">
                    <label>Last Name:</label>
                    <input class="register-input" v-model="userInfo.lastName" required>
                </div>
            </div>
            <div class="form-component">
                <label>Email:</label>
                <input type="email" class="register-input" v-model="userInfo.email" required>
            </div>
            <div class="form-component">
                <label>Password:</label>
                <input class="register-input" v-model="userInfo.password" type="password" required>
            </div>
            <div class="form-component">
                <label>Re-enter Password:</label>
                <input class="register-input" v-model="userInfo.rePassword" type="password" required>
            </div>
            <button type="submit" class="button">Sign Up!</button>
            <RouterLink to="/login" class="link">Already have an account? Sign in!</RouterLink>
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

.register-input {
    width: 100%;
    height: 20px;
    border-color: rgb(192, 246, 255);
    border-width: 3px;
}

.link {
    margin-top: 20px;
}

.register {
    height: 726px;
    width: 100%;
    background-image: url(/src/assets/flickerpix_register.png);
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

.names {
    width: 90%;
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
