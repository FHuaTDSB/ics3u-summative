<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';

const store = useStore();

function checkout() {
    if (store.cart.size >= 1) {
        store.cart.clear()
        localStorage.clear(`cart_${store.user.email}`);
        alert("Thank you for your purchase!")
    }
}

function deleteMovie(key) {
    store.cart.delete(key)
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}
</script>

<template>
    <Header />
    <div class="main">
        <div class="main-title-box">
            <h1>Shopping Cart</h1>
        </div>
        <button @click="checkout()">
            Checkout
            <img src="/src/assets/flickerpix_cart.png" alt="Shopping cart">
        </button>
        <div v-if="store.cart.size == 0" class="empty-cart">
            <h2 class="movieless-text">No movies, only sadness...</h2>
            <img src="/src/assets/flickerpix_movieless.png">
            <RouterLink to="/movies" class="link">Back to browsing!</RouterLink>
        </div>
        <div class="gallery">
            <div class="item" v-for="([key, movie]) in store.cart">
                <button @click="deleteMovie(key)">Remove</button>
                <div>
                    <img src="/src/assets/frame-2.png" alt="Small picture frame" class="frame">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.url}`" class="poster" />
                </div>
                <div class="title-box">
                    <h2>{{ movie.title }}</h2>
                </div>
            </div>
        </div>
    </div>
    <div class="break" />
    <Footer />
</template>

<style scoped>
h1 {
    font-size: 50px;
    text-decoration: underline;
    color: rgb(236, 227, 119);
}

h2 {
    font-size: 30px;
    text-align: center;
}

button {
    color: rgb(236, 227, 119);
    background-color: rgb(0, 88, 52);
    border-color: rgb(236, 227, 119);
    border-style: outset;
    border-width: 2px;
    height: 40px;
    width: 130px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s;
}

button:hover {
    background-color: rgb(0, 47, 53);
    text-decoration: underline;
    cursor: pointer;
}

.movieless-text {
    font-size: 50px;
    color: rgb(17, 129, 77);
}

.link {
    font-size: 30px;
    color: rgb(27, 187, 112);
    text-decoration: none;
    transition: background-color 0.2s;
}

.link:hover {
    text-decoration: underline;
    color: rgb(17, 129, 77);
}

.poster {
    height: 353px;
    width: 239px;
}

.main {
    display: flex;
    flex-direction: column;
    background-image: url(/src/assets/flickerpix_movies.png);
    align-items: center;
    row-gap: 30px;
    min-height: 726px;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
}

.title-box {
    width: 251px;
    height: 35x;
    background-color: aliceblue;
    border-radius: 10px;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 20px;
    margin-bottom: 20px;
    column-gap: 40px;
}

.main-title-box {
    background-color: rgb(0, 88, 52);
    border-color: rgb(236, 227, 119);
    border-style: outset;
    border-width: 2px;
    height: 70px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.frame {
    position: absolute;
    height: 364px;
    width: 250px;
}

.empty-cart {
    height: 480px;
    width: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(9, 4, 24, 0.8);
    flex-direction: column;
}
</style>