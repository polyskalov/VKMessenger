<template>
    <img :src="this.photo.sizes[6].url" style="max-width:100%">
</template>

<script>
export default {
    props: ['photo']
}
</script>
