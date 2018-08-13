<script>
import Attachment from './attachments/Attachment.vue';

export default {
    props: ['message', 'in-read', 'out-read'],
    computed: {
        peer: function() {
            return this.$store.getters.peerById(this.message.from_id);
        },
        unread () {
            return (
                this.message.id > this.inRead
                ||
                this.message.id > this.outRead
            )
        }
    },
    components: {
        Attachment
    }
}
</script>

<template>
    <div class="im-history__message" v-bind:class="{'im-history__message_unread': unread}">
        <a :href="'https://vk.com/id'+message.from_id" target="__blank">
            <img :src="peer.photo_50" class="im-history__message__photo user-photo">
        </a>
        <div class="im-history__message__body">
            <div class="im-history__message__meta">
                <a :href="'https://vk.com/id'+message.from_id" class="im-history__message__username" target="__blank">
                    <template v-if="peer.name">{{peer.name}}</template>
                    <template v-else>{{peer.first_name}}</template>
                </a>
                <span class="im-history__message__time">{{message.date | moment().format('HH:mm')}}</span>
            </div>
            <div class="im-history__message__text" v-html="$options.filters.linkify(message.text)"></div>
            <template v-if="message.fwd_messages">
                <div v-for="fwd_message in message.fwd_messages" v-bind:key="fwd_message.date">
                    <strong>Forwarded message from id{{fwd_message.from_id}}:</strong> {{fwd_message.text}}
                </div>
            </template>

            <attachment v-for="attachment in message.attachments" :attachment="attachment" :key="attachment.id"></attachment>
        </div>
    </div>
</template>

<style>
.im-history__day {
	color: #828282;
	text-align: center;
	font-size: 12.5px;
	background: #fff;
	font-weight: 400;
	position: relative;
	margin: 10px 43px;
	border: none;
	padding: 0;
}

.im-history__message {
	display: flex;
	flex-shrink: 0;
	font-size: 13px;
	border-radius: 3px;
	margin: 0 10px;
	overflow: hidden;
	padding: 5px 20px;
}
.im-history__message_unread {
	background: #edf0f5;
}

.im-history__message__body {
	overflow: hidden;
	margin: 0 10px;
	flex-grow: 1;
	flex-shrink: 1;
}
.im-history__message__photo {
	background-color: #fafbfc;
	flex-shrink: 0;
	height: 36px;
	width: 36px;
	margin: 5px;
	margin-left: 15px;
}
.im-history__message__meta {
	font-size: 12px;
	margin-top: 10px;
}
.im-history__message__text {
	margin-top: 5px;
	word-wrap: break-word;
}
.im-history__message__username {
	max-width: 200px;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: inline-block;
	vertical-align: top;
	margin-right: 10px;
}
.im-history__message__time {
	font-weight: 400;
	color: rgba(120, 127, 140, 0.6);
}
</style>
