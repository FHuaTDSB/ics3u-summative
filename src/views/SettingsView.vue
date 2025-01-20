<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { ref } from 'vue';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const store = useStore();
const name = store.user.displayName.split(" ");
const email = store.user.email;
const password = ref("");
const rePassword = ref(null);

async function updateUserInfo() {
    if (store.user.providerData[0].providerId != "google.com") {
        try {
            await updateProfile(store.user, { displayName: `${name[0]} ${name[1]}` });
            alert("Successfully update user info!")
            location.reload()
        } catch (error) {
            alert("Couldn't update user info!")
        }
    } else {
        alert("Can not update user info with Google!")
    }
}

async function updateUserPassword() {
    if (store.user.providerData[0].providerId != "google.com") {
        try {
            if (password.value.length >= 6) {
                const cred = EmailAuthProvider.credential(email, password.value);
                await reauthenticateWithCredential(store.user, cred);
                await updatePassword(store.user, rePassword.value);
                alert("Successfully updated password!");
            }
        } catch (error) {
            alert("Couldn't update password!")
        }
    } else {
        alert("Can not update user info with Google!")
    }
}
</script>

<template>
    <Header />
    <div class="main">
        <form @submit.prevent>
            <div class="form-section">
                <h2>Your settings</h2>
                <label>First Name:</label>
                <input v-model:="name[0]" class="display">
            </div>
            <div class="form-section">
                <label>Last Name:</label>
                <input v-model:="name[1]" class="display">
            </div>
            <div class="form-section">
                <label>Email:</label>
                <input v-model:="email" class="display" readonly>
                <button v-on:click="updateUserInfo()">Update info!</button>
            </div>
            <div class="form-section">
                <label class="small-label">Change password:</label>
                <input v-model:="rePassword" class="display" type="password">
                <label class="small-label">Enter current password:</label>
                <input v-model:="password" class="display" type="password">
                <button v-on:click="updateUserPassword()">Update password!</button>
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
    background-image: url(/src/assets/flickerpix_settings_bg.png);
    flex-direction: column;
    align-items: center;
}

form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    background-color: aliceblue;
    height: 650px;
    width: 500px;
    margin-top: 2%;
    justify-content: center;
}

button {
    background-color: aliceblue;
    color: black;
    border-color: rgb(192, 246, 255);
    border-style: inset;
    border-width: 3px;
    height: 40px;
    width: 300px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.1s;
    margin-top: 15px;
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

.small-label {
    font-size: 18px;
    padding-top: 10px;
}
</style>