<template>
    <form @submit.prevent="send" class="im-send-form">
        <textarea v-model="message" name="message" class="im-send-form__textarea" placeholder="Напишите сообщение…"></textarea>
        <button class="im-send-form__submit-button"></button>
    </form>
</template>

<script>
export default {
    props: ['peer'],
    data: function() {
        return {
            message: '',
            loading: false
        }
    },
    methods: {
        send: function() {
            this.loading = true;
            this.$http.jsonp(
                'https://api.vk.com/method/messages.send', 
                {
                    params: {
                        v: '5.78',
                        peer_id: this.peer,
                        access_token: this.$store.state.token,
                        random_id: new Date().getMilliseconds(),
                        message: this.message
                    }
                }
            ).then(response => {
                this.loading = false;
                this.message = '';
                
                this.$root.getHistory(this.peer);
            });
        }
    }
}
</script>

<style>

.im-send-form {
	padding: 0 0 0 10px;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	border-top: solid 1px #e4e6e9;
	background: #fafbfc;
}

.im-send-form__textarea {
	flex-grow: 1;
	font-size: 13px;
	height: 36px;
	min-height: 36px;
	max-height: 200px;
	border-radius: 6px;
    line-height: 17px;
	padding: 9px 74px 10px 13px;
	margin: 12px 0;
	border: solid 1px #d3d9de;
	outline: 0;
}

.im-send-form__submit-button {
	align-self: flex-end;
	background: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#828A99" d="M4.7 15.8C4 17.7 3.6 19 3.4 19.7c-.6 2.4-1 2.9 1.1 1.8 2.1-1.1 12-6.7 14.3-7.9 2.9-1.6 2.9-1.5-.2-3.2C16.3 9 6.4 3.6 4.6 2.5s-1.7-.6-1.2 1.8c.2.8.6 2.1 1.3 3.9.5 1.3 1.6 2.3 3 2.5l5.8 1.1c.1 0 .1.1.1.1s0 .1-.1.1l-5.8 1.1c-1.3.4-2.5 1.3-3 2.7z"/></svg>') 50% no-repeat;
	background-size: 24px 24px;
	width: 52px;
    height: 55px;
	border: none;
	outline: none;
    padding: 31px 28px;
    cursor: pointer;
	opacity: 0.7;
	animation: 0.15s linear 0s im-zoom-appear;
}
.im-send-form__submit-button:hover {
	opacity: 1;
}
</style>
