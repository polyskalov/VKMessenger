<template>
    <a :href="'https://vk.com/wall'+wall.to_id+'_'+wall.id" target="_blank">Запись на стене</a>
</template>

<script>
export default {
    props: ['wall']
}
</script>
