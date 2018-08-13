<script>
export default {
    props: ['sticker']
}
</script>

<template>
    <img :src="sticker.images[1].url" class="sticker">
</template>

<style>
.sticker {
    height:128px;
    max-width:100%;
}
</style>
