<script>

import moment from 'moment';

let DIALOG_COLORS = [
    "#FA6664", "#E63F3C",
    "#FFC247", "#FFA21F",
    "#FFE500", "#EBCB00",
    "#6BD670", "#49B84F"
];

export default {
    props: ['dialog'],
    methods: {
        select: function() {
            this.$router.push('?peer=' + this.dialog.conversation.peer.id);
        },
        getColor() {
            return DIALOG_COLORS[this.dialog.conversation.peer.id % 8];
        }
    },
    computed: {
        selected: function() {
            return (this.dialog.conversation.peer.id == this.$store.state.currentPeer);
        },
        unread () {
            return (
                this.dialog.conversation.last_message_id != this.dialog.conversation.in_read
                ||
                this.dialog.conversation.last_message_id != this.dialog.conversation.out_read
            )
        },
        hasChat() {
            return this.dialog.conversation.peer.type == 'chat';
        },
        peer: function() {
            if(this.dialog.conversation.peer.type != 'chat') {
                var id = this.dialog.conversation.peer.id;
            } else {
                var id = this.dialog.last_message.from_id;
            }

            return this.$store.getters.peerById(id);
        }
    },
    filters: {
        dialogTimeFormat: (timestamp) => {
            var time = moment.unix(timestamp);

            // Today
            if(time.isSame(moment(), 'day')) {
                return time.format('H:mm');
            // Yesterday
            } else if( time.isSame(moment().subtract(1, 'day'), 'day') ) {
                return time.format('вчера');
            // Current year
            } else if (time.isSame(moment(), 'year')) {
                return time.format('D MMM');
            // All other
            } else {
                return time.format('D MMM YYYY');
            }
        }
    }
}
</script>

<template>
    <div class="dialog" :class="{dialog_selected: selected}" @click="select">
        <div class="user-container" :class="{online: peer.online}">
            <div class="dialog__photo user-photo" :style="{backgroundColor: hasChat ?  getColor(): ''}">
                <div v-if="hasChat && !dialog.conversation.chat_settings.photo">{{dialog.conversation.chat_settings.title.charAt(0)}}</div>
                <img v-else-if="hasChat" :src="dialog.conversation.chat_settings.photo" alt="">
                <img v-else :src="peer.photo_50" alt="">
            </div>
        </div>
       
        <div class="dialog__content">
            <div class="dialog__name">
                <template v-if="hasChat">{{dialog.conversation.chat_settings.title}}</template>
                <template v-else-if="peer.name">{{peer.name}}</template>
                <template v-else-if="peer.first_name">{{peer.first_name}} {{peer.last_name}}</template>
            </div>
            <span class="dialog__time">{{this.dialog.last_message.date | dialogTimeFormat}}</span>
            <div class="dialog__remove-button" title="Удалить диалог">×</div>
            
            <div class="dialog__message">
                <span v-if="dialog.last_message.out" class="dialog__who">Вы:</span>
                <span v-else-if="dialog.conversation.peer.type == 'chat'" class="dialog__who">{{peer.first_name}}:</span>
                <span class="dialog__message-body">
                    {{dialog.last_message.text}}
                    <span v-if="dialog.last_message.attachments.length"><strong>[Вложение]</strong></span>
                    <span v-if="dialog.last_message.fwd_messages.length"><strong>[Сообщение]</strong></span>
                </span>
                <div class="dialog__unread-indicator" v-if="unread"></div>
            </div>
        </div>
    </div>
</template>


<style>
.dialog {
	display: flex;
    flex-direction: row;
    align-items: center;
	border-bottom: solid 1px #e4e6e9;
	cursor: pointer;
	position: relative;
	padding: 0 15px;
	overflow: hidden;
}
.dialog:not(.dialog_selected):hover {
	background: #f5f7fa;
}

.dialog_selected {
	background: #5b88bd;
}


.dialog__photo {
	align-self: center;
	height: 46px;
    width: 46px;
    line-height: 46px;
    text-align: center;
	margin: 5px;
	flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
    font-size: 25px;
    color: #fff;
    text-transform: uppercase;
}
.dialog__content {
	flex-grow: 1;
	padding: 8px 0;
	margin-left: 5px;
	min-width: 0; /* Overflow:hidden fix for flex */
}
.dialog__name {
	color: #222;
	display: inline-block;
	font-size: 12.5px;
	font-weight: 500;
	margin-top: 10px;
	max-width: 70%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.dialog__time {
	font-size: 12px;
	color:#777e8c;
	float: right;
	margin-top: 10px;
	opacity: 0.7;
}
.dialog:hover .dialog__time {
	display: none;
}
.dialog__remove-button {
	color:#777e8c;
	opacity: 0;
	position: absolute;
	right: 5px;
	cursor: pointer;
	display: inline-block;
	padding: 5px 10px;
	font-size: 16px;
	font-weight: bold;
}
.dialog:hover .dialog__remove-button {
	opacity: 0.4;
}
.dialog .dialog__remove-button:hover {
	opacity: 1;
}
.dialog__who {
    color: #8b939b;
    margin-right: 3px;
}


.dialog__message {
    display: flex;
    align-items: center;
	color: #656565;
	font-size: 12.5px;
	max-width: 100%;
	overflow: hidden;
	padding: 5px 0;
	text-overflow: ellipsis;
	white-space: nowrap;
    line-height: 16px;
}
.dialog_selected .dialog__name,
.dialog_selected .dialog__message,
.dialog_selected .dialog__time,
.dialog_selected .dialog__who,
.dialog_selected .dialog__remove-button {
	color: #fff;
}
.dialog_selected .online:after {
    border-color: #5b88bd;
}
.dialog:not(.dialog_selected):hover .online:after {
    border-color: #f5f7fa;
}
.dialog__message-body {
    flex-grow:1;
    overflow: hidden;
    text-overflow: ellipsis;
}
.dialog__unread-indicator {
    flex-shrink: 0;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin-left: 5px;
    background: #93adc8e6;
}
.dialog_selected .dialog__unread-indicator {
    background: #fff;
    color: #5b88bd;
}
</style>
