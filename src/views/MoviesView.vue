<script setup>
import Header from '../components/Header.vue';
import Genres from '../components/Genres.vue';
import Footer from '../components/Footer.vue';
const genresList = [
    {
        id: 16,
        genreName: "Animation",
    },
    {
        id: 35,
        genreName: "Comedy",
    },
    {
        id: 14,
        genreName: "Fantasy",
    },
    {
        id: 12,
        genreName: "Adventure",
    },
    {
        id: 878,
        genreName: "Sci-Fi",
    },
]
</script>

<template>
    <Header />
    <Genres :genres="genresList"/>
    <div class="break" />
    <Footer />
</template>

<style scoped></style>
