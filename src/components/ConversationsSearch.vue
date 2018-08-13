<template>
    <div class="dialogs-search">
        <input type="search" v-model="query" class="dialogs-search__field" placeholder="Поиск">
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            query: ''
        }
    },
    methods: {
        search: function() {
            this.loading = true;
            this.$http.jsonp(
                'https://api.vk.com/method/messages.search', 
                {
                    params: {
                        v: '5.80',
                        access_token: this.$store.state.token,
                        q: this.query,
                        extended: true,
                        count: 50
                    }
                }
            ).then(response => {
                this.loading = false;
                this.messages = response.body.response.items;

                // if (typeof response.body.response.profiles !== 'undefined') {
                //     response.body.response.profiles.map(user => {
                //         this.users[user.id] = user;
                //     });
                // }

                // if (typeof response.body.response.groups !== 'undefined') {
                //     response.body.response.groups.map(group => {
                //         this.groups[group.id] = group;
                //     });
                // }
            });
        }
    },
    watch: {
        query: function() {
            this.search();
        }
    }
}
</script>

<style>
.dialogs-search {
    display: flex;
    flex-grow: 1;
}
.dialogs-search__field {
	flex-grow: 1;
	flex-shrink: 0;
	background-color: #eef1f4;
	border: 0;
	border-radius: 3px;
	font-size: 14px;
	padding: 10px;
	margin: 10px;
	outline: none;
}
.dialogs-search__field::placeholder {
	color: #9ca2ad;
}
</style>
