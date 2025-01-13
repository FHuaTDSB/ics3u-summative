<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';

const router = useRouter();
const firstName = ref("")
const lastName = ref("")
const email = ref("")
const password = ref("")
const rePassword = ref("")
const store = useStore();

async function registerbyEmail() {
    if (password.value == rePassword.value) {
        if (password.value.length >= 6) {
            try {
                const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
                await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
                store.user = user;
                router.push("/movies");
            } catch (error) {
                alert("There was an error creating a user with email!")
            }
        }
        else {
            alert("Password must be at least 6 characters long!")
        }
    } else {
        alert("Passwords must match!")
    }
}

async function registerWithGoogle() {
    try {
        const user = ((await signInWithPopup(auth, new GoogleAuthProvider)).user)
        store.user = user
        router.push("/movies")
    } catch (error) {
        alert("There was an error creating a user with Google!")
    }

}
</script>

<template>
    <Header />
    <div class="register">
        <div class="sign-up-window">
            <form @submit.prevent="registerbyEmail()">
                <label class="title">Join FlickerPix!</label>
                <div class="names">
                    <div class="form-component">
                        <label>First Name:</label>
                        <input class="register-input" v-model="firstName" required>
                    </div>
                    <div class="form-component">
                        <label>Last Name:</label>
                        <input class="register-input" v-model="lastName" required>
                    </div>
                </div>
                <div class="form-component">
                    <label>Email:</label>
                    <input type="email" class="register-input" v-model="email" required>
                </div>
                <div class="form-component">
                    <label>Password:</label>
                    <input class="register-input" v-model="password" type="password" required>
                </div>
                <div class="form-component">
                    <label>Re-enter Password:</label>
                    <input class="register-input" v-model="rePassword" type="password" required>
                </div>
                <button type="submit" class="button">Sign Up!</button>
            </form>
            <button class="button2" @click="registerWithGoogle()">Sign up with Google!</button>
            <RouterLink to="/login" class="link">Already have an account? Sign in!</RouterLink>
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

.sign-up-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
    height: 550px;
    width: 500px;
    margin-top: 5%;
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
    margin-top: 15px;
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
