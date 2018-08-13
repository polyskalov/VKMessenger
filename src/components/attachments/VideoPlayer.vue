<template v-if="showVideoPlayer">
    <iframe :src="options.player" frameborder="0"></iframe>
</template>

<script>
export default {
    props: ['video'],
    data() {
        return {
            options: {},
            showVideoPlayer: false
        }
    },
    methods: {
        getVideo() {
            this.$http.jsonp(
                'https://api.vk.com/method/video.get', {
                    params: {
                        v: '5.80',
                        videos: this.video.owner_id + '_' + this.video.id + '_' + this.video.access_key,
                        access_token: this.$store.state.token,
                        count: 50,
                    }
            }).then(response => {
                this.options = response.body.response.items[0];
            });
        }
    },
    mounted() {
        this.getVideo();
    }
}
</script>

<style>
    
</style>
