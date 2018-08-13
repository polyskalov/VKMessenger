<script>
export default {
    props: ['doc']
}
</script>

<template>
    <div class="document">
        <p><strong><a :href="this.doc.url" target="_blank">{{this.doc.title}}</a></strong></p>
        <audio v-if="this.doc.ext == 'ogg'" controls class="audio-message">
            <source :src="this.doc.url" type="audio/mpeg">
        </audio>
    </div>
</template>

<style>

</style>
