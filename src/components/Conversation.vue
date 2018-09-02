<script>
import Message from './Message';
import MessageForm from './MessageForm';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

export default {
    components: {
        Message,
        MessageForm
    },
    filters: {
        conversationDate(date) {
            return moment(date).calendar(null, {
                sameDay: 'Сегодня',
                lastDay: 'Вчера',
                lastWeek: 'D MMMM',
                sameElse: function (now) {
                    if (this.isSame(now, 'year')) {
                        return 'D MMMM';
                    } else {
                        return 'LL';
                    }
                }
            });
        }
    },
    data () {
        return {
            loading: false,
            conversation: {},
            messages: []
        }
    },
    computed: {
        peer() {
            return this.$store.getters.currentPeer;
        },
        messagesGroupedByDate() {
            return this._groupMessagesByDate(this.messages.reverse());
        }
    },
    watch: {
        peer (peer_id) {
            this.getHistory(peer_id);
        }
    },
    beforeMount() {
        if (this.peer != 0) {
            this.getHistory(this.peer);
        }
    },
    updated() {
        this.$refs.historyView.scrollTop = this.$refs.historyView.scrollHeight;
    },
    methods: {
        getHistory: function(peer_id) {
            this.loading = true;
            this.messages = [];

            this.$http.jsonp(
                'https://api.vk.com/method/messages.getHistory', {
                    params: {
                        v: '5.80',
                        peer_id: peer_id,
                        access_token: this.$store.state.token,
                        count: 200,
                        offset: 0,
                        extended: true
                    }
            }).then(response => {

                if (typeof response.body.response.profiles !== 'undefined') {
                    response.body.response.profiles.map(user => {
                        this.$store.commit('addUser', user);
                    });
                }

                if (typeof response.body.response.groups !== 'undefined') {
                    response.body.response.groups.map(group => {
                        this.$store.commit('addGroup', group);
                    });
                }

                this.messages = response.body.response.items;
                this.conversation = response.body.response.conversations[0];

                this.loading = false;
            });
        },
        _groupMessagesByDate(messages) {
            return groupBy(messages, function (message) {
                return moment.unix(message.date).startOf('day').format();
            });
        }
    }
}
</script>

<template>
    <div class="dialog-info">
        <div class="conversation-header" v-if="peer !== 0">
            <div class="conversation__name">{{peer}}</div>
        </div>

        <div class="im-history" ref="historyView">
            <div v-if="loading" class="spinner"></div>
            <div v-else-if="peer === 0" class="im-placeholder">Пожалуйста, выберите диалог</div>
            <div v-else-if="messages.length == 0" class="im-placeholder">Здесь будет выводиться история переписки</div>
            
            <div v-for="(messagesAtDay, date) in messagesGroupedByDate" :key="date">
                <template>
                    <div class="im-history-date">{{date | conversationDate}}</div>
                    <message
                    
                        v-for="message in messagesAtDay"
                        :key="message.id"
                        :message="message"
                        :in-read="conversation.in_read"
                        :out-read="conversation.out_read"
                    />
                </template>
            </div>
        </div>

        <message-form :peer="peer" v-if="peer !== 0"/>
    </div>
</template>

<style>
.conversation-header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 5;
    height: 57px;
    background: #fff;
    border-bottom: 1px solid #e4e6e9;
    white-space: nowrap;
    font-size: 13px;
    line-height: 18px;
}
.conversation__name {
    line-height: 26px;
    margin: 15px 20px;
    font-weight: bold
}

.im-history {
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	flex-grow: 1;
}

.im-history-date {
    color: #828282;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    padding: 3px 15px;
}

.im-placeholder {
	color: #929eb0;
	font-size: 13px;
	display:flex;
	flex-grow:1;
	text-align: center;
	align-items: center;
	justify-content: center;
	padding-top: 100px; /* Image at top */
	background: url("https://vk.com/images/icons/empty_icon.png") no-repeat center;
	user-select: none
}
</style>
