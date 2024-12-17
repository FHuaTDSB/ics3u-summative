<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const response = ref(null);
const numbers = ref([]);

numbers.value = (() => {
  const set = new Set();

  while (true) {
    set.add(Math.floor(Math.random() * 15)+4);

    if (set.size === 5) {
      return set;
    }
  }
})();

onMounted(async () => {
    response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
})
</script>

<template>
    <div class="recommended">
        <h2>Recommended</h2>
        <div class="recommended-movies" v-if="response">
            <div v-for="number in numbers" :key="response.data.results[number].id" class="movie">
                <img src="/src/assets/frame-2.png" alt="Small picture frame" class="frame">
                <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`"
                    alt="Featured movie poster" class="poster">
            </div>
        </div>
    </div>
    <div class="break"></div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
}

h2 {
    color: rgb(10, 0, 41);
    font-size: 30px;
    margin: 0px;
    text-decoration: underline;
}

.recommended {
    height: 305px;
    background-image: url(/src/assets/flickerpix-recommended.png);
    flex-direction: column;
    row-gap: 20px;
    padding-top: 5px;
}

.recommended-movies {
    width: 100%;
    justify-content: space-around;
}

.movie-poster {
    height: 235px;
    width: 159px;
}

.frame {
    position: absolute;
    height: 244px;
    width: 167px;
}

.poster {
    height: 235px;
    width: 159px;
}
</style>
