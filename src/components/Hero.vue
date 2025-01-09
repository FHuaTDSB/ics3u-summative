<script setup>
import axios from 'axios';
import { useStore } from '../store';

const store = useStore()

const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
const featuredMovie = (response.data.results[Math.floor(Math.random() * 4)])
</script>

<template>
    <div class="hero">
        <div class="hero-content">
            <div>
                <p class="hero-content-main">STREAM YOUR FAVOURITES</p>
                <img src="/src/assets/knightmovie.gif" alt="Knight watching movie" class="knight-movie">
            </div>
            <p class="hero-content-sub">Renting a film has never been easier! Sign up to
                FlickerPix and enjoy all of YOUR top picks in high quality and multilingual
                subtitles, uninterrupted! For a low subscription fee, your viewing experiences
                will be like never before!</p>
            <RouterLink to="/register" class="button" v-if="!store.user">Start your free trial!</RouterLink>
            <RouterLink to="/movies" class="button" v-else>Brows films now!</RouterLink>
        </div>
        <div class="hero-content-poster">
            <img src="/src/assets/frame-1.png" alt="Picture frame" class="frame">
            <img :src="`https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`" alt="Featured movie poster"
                class="poster">
        </div>
    </div>
    <div class="break"></div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
}

.button {
    color: rgb(236, 227, 119);
    background-color: rgb(10, 0, 41);
    border-color: rgb(236, 227, 119);
    height: 50px;
    width: 240px;
    font-size: 25px;
    border-style: outset;
    border-width: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s;
}

.button:hover {
    background-color: rgb(0, 31, 78);
    text-decoration: underline;
}

.hero {
    padding-bottom: 70px;
    padding-top: 70px;
    padding-left: 7%;
    align-items: flex-start;
    background-image: url(/src/assets/flickerpix_hero.png);
}

.hero-content {
    flex-direction: column;
    width: 600px;
    flex-shrink: 0;
    align-items: flex-start;
    row-gap: 0px;
    margin-right: 60px;
    background-color: rgba(0, 0, 50, 0.6);
    padding: 20px;
}

.hero-content-poster {
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    height: 340px;
    width: 260px;
}

.knight-movie {
    height: 128px;
    width: 128px;
}

.hero-content-main {
    font-size: 70px;
    line-height: 1.0;
    margin-bottom: 0px;
    margin-top: 0px;
    color: rgb(236, 227, 119);
}

.hero-content-sub {
    margin-top: 30px;
    margin-bottom: 30px;
    color: rgb(236, 227, 119);
    font-size: 20px;
}

.frame {
    position: absolute;
    height: 420px;
    width: 320px;
}

.poster {
    height: 350px;
    width: 240px;
}
</style>
