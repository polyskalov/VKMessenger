<script>
export default {
    props: ['link']
}
</script>


<template>
    <a :href="this.link.url">
        <p><strong>{{this.link.title}}</strong></p>
        <small>{{this.link.caption}}</small>
    </a>
</template>
