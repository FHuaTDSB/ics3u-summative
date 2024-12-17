<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
const numbers = ref([])

if (response.data.videos.results.length >= 3) {
    numbers.value = (() => {
        const set = new Set();

        while (true) {
            set.add(response.data.videos.results[Math.floor(Math.random() * response.data.videos.results.length)]);

            if (set.size === 3) {
                return set;
            }
        }
    })();
}
else {
    for (let i = 0; i < response.data.videos.results.length; i++) {
        numbers.value.push(response.data.videos.results[i])
    }
}
</script>

<template>
    <div class="main-body">
        <div class="content">
            <h1 class="title">{{ response.data.original_title }}</h1>
            <div class="sub-body">
                <div class="poster-container">
                    <img src="/src/assets/frame-1.png" alt="Picture frame" class="frame">
                    <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
                        class="poster" />
                </div>
                <div class="fine-details">
                    <p class="tagline">{{ response.data.tagline }}</p>
                    <p class="overview">{{ response.data.overview }}</p>
                    <a class="site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
                    <p class="release-date">Release Date: {{ response.data.release_date }}</p>
                    <p class="rating">Rating: {{ response.data.vote_average }}/10</p>
                </div>
            </div>

            <h2>Trailers</h2>
            <div class="trailer-containers">
                <div v-for="trailer in numbers" :key="response.data.videos.results" class="trailer-body">
                    <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
                        <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
                            class="trailer-thumbnail" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div {
    display: flex;
}

h1 {
    font-size: 50px;
    text-decoration: underline;
    padding-top: 10px;
    color: rgb(236, 227, 119);
}

h2 {
    font-size: 35px;
    text-decoration: underline;
    padding-top: 10px;
    color: rgb(236, 227, 119);
}

p {
    font-size: 20px;
    color: rgb(236, 227, 119);
}

a {
    font-size: 20px;
    color: rgb(0, 255, 149);
}

.main-body {
    flex-direction: column;
    align-items: center;
    background-image: url(/src/assets/flickerpix_movies.png)
}

.content {
    flex-direction: column;
    align-items: center;
    background-color: rgba(17, 17, 37, 0.6);
    width: 100%;
}

.sub-body {
    padding: 30px;
    padding-top: 20px;
    width: 1000px;
}

.poster {
    width: 320px;
}

.fine-details {
    flex-direction: column;
    padding: 30px;
    row-gap: 20px;
}

.trailer-containers {
    justify-content: center;
    column-gap: 30px;
    padding-bottom: 20px;
    padding-top: 10px;
}

.trailer-body {
    width: 384px;
    height: 288px;
}

.trailer-thumbnail {
    width: 100%;
}

.frame {
    position: absolute;
    height: 590px;
    width: 420px;
}

.poster-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
    margin-top: 60px;
    margin-bottom: 20px;
}
</style>
