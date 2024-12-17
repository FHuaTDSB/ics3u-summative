<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { ref } from 'vue';

const store = useStore();
const firstName = ref(store.userInfo.firstName);
const lastName = ref(store.userInfo.lastName);
const email = store.userInfo.email;
function updateUserInfo() {
    console.log(firstName.value)
    store.userInfo.firstName = firstName.value;
    store.userInfo.lastName = lastName.value;
    alert("Successfully updated user info!");
}
</script>

<template>
    <Header />
    <div class="main">
        <form @submit.prevent>
            <div class="form-section">
                <h2>Your settings</h2>
                <label>First Name:</label>
                <input v-model:="firstName" class="display">
            </div>
            <div class="form-section">
                <label>Last Name:</label>
                <input v-model:="lastName" class="display">
            </div>
            <div class="form-section">
                <label>Email:</label>
                <input v-model:="email" class="display" readonly>
            </div>
            <div class="form-section">
                <button v-on:click="updateUserInfo()">Update info!</button>
            </div>
        </form>
    </div>
    <div class="break" />
    <Footer />
</template>

<style scoped>
h2 {
    font-size: 40px;
    text-decoration: underline;
    padding-bottom: 20px;
}

label {
    font-size: 20px;
}

.main {
    width: 100%;
    height: 726px;
    display: flex;
    background-image: url(/src/assets/flickerpix_placeholder.png);
    flex-direction: column;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    background-color: aliceblue;
    height: 500px;
    width: 500px;
    margin-top: 5%;
    justify-content: center;
}

button {
    background-color: aliceblue;
    color: black;
    border-color: rgb(192, 246, 255);
    border-style: inset;
    border-width: 3px;
    height: 40px;
    width: 200px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.1s;
}

button:hover {
    background-color: rgb(192, 246, 255);
    text-decoration: underline;
    cursor: pointer;
}

.form-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    margin: 10px;
}

.display {
    width: 100%;
    height: 20px;
    border-color: rgb(192, 246, 255);
    border-width: 3px;
}
</style>