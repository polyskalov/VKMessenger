<script>
import ConversationsItem from './ConversationsItem.vue';
import ConversationsSearch from './ConversationsSearch.vue';

export default {
    data () {
        return {
            conversations: [],
            loading: false,
        };
    },
    methods: {
        getConversations: function () {
            if (!this.conversations.length) {
                this.loading = true;
            }

            this.$http.jsonp('https://api.vk.com/method/messages.getConversations', {
                params: {
                    v: '5.80',
                    access_token: this.$store.state.token,
                    count: 100,
                    offset: 0,
                    extended: 1 // + profiles and groups
                }
            })
            .then(response => {
                this.loading = false;
                this.conversations = response.body.response.items;

                response.body.response.profiles.map(user => {
                    this.$store.commit('addUser', user);
                });
                
                response.body.response.groups.map(group => {
                    this.$store.commit('addGroup', group);
                });
            }).catch(error => {
                setTimeout(this.getConversations, 5000);
            });
        }
    },
    beforeMount() {
        this.getConversations();
    },
    mounted() {
        setInterval(
            () => {
                this.getConversations()
            }, 
            1000 * 60 * 5
        );
    },
    components: {
        ConversationsItem,
        ConversationsSearch
    }
}
</script>

<template>
    <aside class="conversations-page">
        <div class="conversations-header">
            <conversations-search></conversations-search>
            <button class="menu-button"></button>
        </div>
        
        <div v-if="loading" class="spinner"></div>
        <transition-group v-else tag="div" class="conversations-list" name="fade">
            <conversations-item
                v-for="dialog in conversations"
                :dialog="dialog"
                :key="dialog.conversation.peer.id"
            ></conversations-item>
        </transition-group>
    </aside>
</template>

<style>
.conversations-page {
    display: flex;
    flex-direction: column;
    border-right: solid 1px #e4e6e9;
	flex-shrink: 0;
    flex-grow: 0;
    width: 350px;
}

.conversations-list {
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.conversations-header {
    display: flex;
    background: #fff;
    border-bottom: solid 1px #e4e6e9;
    flex-direction: row;
    flex-shrink: 0;
}
.menu-button {
    background:url("../assets/svg/dots.svg") 50% no-repeat;
    width: 36px;
    height: 36px;
    border:0;
    margin: 10px;
    padding: 0;
    outline: 0;
    opacity: .8;
}
.menu-button:hover,
.menu-button:focus {
    opacity: 1;
}
.menu-button:active {
    transform: translateY(1px);
}
</style>
