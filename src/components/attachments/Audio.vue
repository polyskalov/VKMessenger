<template>
    <div class="audio" :class="{'audio_playing':playing}">
        <button class="audio__play-pause-button" @click="playPause()"></button>
        <div class="audio__title">{{audio.artist}} — {{audio.title}}</div>
        <div class="audio__duration">
            <template v-if="playing">
                {{currentTime | secondsToTimeString}}
            </template>
            <template v-else>
                {{audio.duration | secondsToTimeString}}
            </template>
        </div>
        <audio
            :src="audio.url"
            :title="audio.artist+' - '+audio.title"
            ref="control"
            hidden
            @timeupdate="timeChange()"
        ></audio>
    </div>
</template>

<script>
export default {
    props: ['audio'],
    data() {
        return {
            currentTime: 0,
            playing: false
        }
    },
    methods: {
        playPause: function() {
            this.$refs.control.paused ? this.$refs.control.play(): this.$refs.control.pause();
            this.playing = !this.$refs.control.paused;
        },
        timeChange() {
            this.currentTime = this.$refs.control.currentTime;
        },
        stop() {
            this.$refs.control.pause();
            this.$refs.control.currentTime = 0;
        }
    }
}
</script>
<style scoped>
    .audio {
        height: 40px;
        margin: 10px 0;
        padding: 5px;
        display: flex;
        flex-direction: row;
        border-radius: 3px;
        align-items: center;
    }
    .audio:hover {
        background-color: #e9edf2;
    }
    .audio_playing {
        background-color: #e9edf1;
    }
    .audio__play-pause-button {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20fill%3D%22%235181B8%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M9.846%2016.86c-.467.303-.846.097-.846-.45V7.588c0-.551.38-.752.846-.45l6.91%204.48c.324.21.327.549%200%20.761l-6.91%204.48z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
        background-position: center;
        background-color: #5080b9;
        width: 30px;
        height: 30px;
        border: 0;
        outline: 0;
        border-radius: 50%;
        flex-shrink: 0;
        margin-right: 10px;
    }
    .audio_playing .audio__play-pause-button {
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20fill%3D%22%235181B8%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M8%207.596c0-.33.277-.596.607-.596h1.786c.335%200%20.607.267.607.596v8.808a.605.605%200%200%201-.607.596H8.607A.602.602%200%200%201%208%2016.404V7.596zm5%200c0-.33.277-.596.607-.596h1.786c.335%200%20.607.267.607.596v8.808a.605.605%200%200%201-.607.596h-1.786a.602.602%200%200%201-.607-.596V7.596z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E")
    }
    .audio__title {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
    }
    .audio__duration {
        color: #939393;
    }
</style>
