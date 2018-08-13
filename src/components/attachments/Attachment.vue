<template>
    <div>
        <template v-if="attachment.type == 'photo'">
            <photo :photo="attachment.photo"/>
        </template>
        <template v-else-if="attachment.type == 'sticker'">
            <sticker :sticker="attachment.sticker"/>
        </template>
        <template v-else-if="attachment.type == 'video'">
            <video-preview :video="attachment.video"/>
        </template>
        <template v-else-if="attachment.type == 'audio'">
            <audio-attachment :audio="attachment.audio"/>
        </template>
        <template v-else-if="attachment.type == 'wall'">
            <wall :wall="attachment.wall"/>
        </template>
        <template v-else-if="attachment.type == 'doc'">
            <document :doc="attachment.doc"/>
        </template>
        <template v-else-if="attachment.type == 'link'">
            <link :link="attachment.link" />
        </template>
        <template v-else>[Unsupported type of attachment: {{attachment.type}}]</template>
    </div>
</template>

<script>
import Photo from './Photo.vue';
import Sticker from './Sticker.vue';
import VideoPreview from './VideoPreview.vue';
import AudioAttachment from './Audio.vue';
import Wall from './Wall.vue';
import Document from './Document.vue';
import Link from './Link.vue';

export default {
    props: {
        attachment: Object
    },
    components: {
        Photo,
        Sticker,
        VideoPreview,
        AudioAttachment,
        Wall,
        Document,
        Link
    }
}
</script>
