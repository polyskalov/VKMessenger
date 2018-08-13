<template>
    <div class="video-preview" @click="showVideoPlayer = true">
        <div class="video-preview__thumbnail" :style="{ 'background-image': 'url(' + video.photo_800 + ')' }">
            <div class="video-preview__play-button"></div>
            <div class="video-preview__duration">{{video.duration | secondsToTimeString}}</div>
        </div>
        <div class="video-preview__title">{{video.title}}</div>
        <div class="video-preview__views">{{video.views.toLocaleString()}} {{video.views | pluralize('просмотр,просмотра,просмотров')}}</div>
        <video-player :video="video"></video-player>
    </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';

export default {
    props: ['video'],
    components: {
        VideoPlayer
    }
}
</script>

<style>
    .video-preview__thumbnail {
        background-size: cover;
        background-position: center;
        max-width: 100%;
        padding-top: 56.25%;
        position: relative;
    }

    .video-preview__play-button {
        position: absolute;
        bottom: 0;
        right: 0;
        top: 0;
        left: 0;
        background: #000;
        background: #00000080 url('../../assets/svg/play-button.svg') no-repeat;
        background-position: 14px center;
        background-size: 30px;
        margin: auto;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: background-color 100ms linear;
    }

    .video-preview__play-button:hover {
        background-color: #0009;
    }

    .video-preview__duration {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 8px;
        padding: 0 7px;
        border-radius: 3px;
        background: #0006;
        color: #fff;
        font-size: 12.5px;
        line-height: 23px;
        height: 23px;
        white-space: nowrap;
    }
    .video-preview__title {
        margin: 10px 0;
        font-weight: bold;
        overflow: hidden;
        word-wrap: break-word;
        line-height: 140%;
    }
    .video-preview__views {
        color: #939393;
        font-size: 12.5px;
    }
</style>
