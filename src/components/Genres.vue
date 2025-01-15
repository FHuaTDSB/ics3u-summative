<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "../store";

const props = defineProps(["genres"]);
const router = useRouter();
const selectedGenre = ref(null);
const response = ref(null);
const store = useStore();

async function getMovieByGenre() {
    response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
    router.push(`/movies/${id}`);
}

const addToCart = (movie) => {
    store.cart.set(String(movie.id), { title: movie.title, url: movie.poster_path });
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
}

onMounted(async () => {
    response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
})
</script>

<template>
    <div class="main">
        <select v-model="selectedGenre" @change="getMovieByGenre()">
            <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
        </select>
        <div v-if="response" class="gallery">
            <div v-for="movie in response.data.results" key="movie.id" class="movie">
                <p v-if="store.cart.has(String(movie.id))" class="movie-added">
                    Added!
                </p>
                <button v-else @click="addToCart(movie)">
                    Buy now!
                    <img src="/src/assets/flickerpix_cart.png">
                </button>
                <div @click="getMovieDetails(movie.id)" class="movie-select">
                    <img src="/src/assets/frame-2.png" alt="Small picture frame" class="frame">
                    <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Featured movie poster"
                        class="poster">
                    <div class="title-box">
                        <p class="title">{{ movie.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
select {
    border-radius: 0px;
    width: 200px;
    height: 30px;
    background-color: rgb(0, 88, 52);
    color: rgb(236, 227, 119);
    margin-top: 10px;
    font-size: 20px;
}

select:focus {
    border-color: rgb(236, 227, 119);
    border-width: 2px;
    border-style: outset;
    outline: none;
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
    margin-bottom: 10px;
}

button:hover {
    background-color: rgb(0, 47, 53);
    text-decoration: underline;
    cursor: pointer;
}

.main {
    display: flex;
    flex-direction: column;
    background-image: url(/src/assets/flickerpix_movies.png);
    align-items: center;
}

.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    column-gap: 40px;
}

.movie {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.movie-select {
    transition: 0.2s;
}

.movie-select:hover {
    scale: 1.05;
    cursor: pointer;
}

.frame {
    position: absolute;
    height: 364px;
    width: 250px;
}

.poster {
    height: 353px;
    width: 239px;
}

.title {
    font-size: 30px;
    margin-top: 10px;
    text-align: center;
}

.title-box {
    width: 251px;
    height: 35x;
    background-color: aliceblue;
    border-radius: 10px;
    margin-bottom: 15px;
}

.movie-added {
    color: rgb(78, 78, 78);
    background-color: rgb(204, 204, 204);
    border-color: rgb(241, 241, 241);
    border-style: inset;
    border-width: 2px;
    height: 36px;
    width: 130px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin-bottom: 10px;
}
</style>
