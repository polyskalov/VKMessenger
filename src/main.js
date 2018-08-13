import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

Vue.use(VueResource);
Vue.use(VueRouter);

import App from './components/App';
import Auth from './components/Auth';

import store from './store';

import './filters';

var router = new VueRouter({
    mode: 'history'
});

var app = new Vue({
    router,
    store,
    el: '#app',
    render: function (createElement) {
        if (this.token) {
            return createElement(App);
        } else {
            return createElement(Auth);
        }
    },
    data () {
        return {
            loading: false
        };
    },
    created() {
        if (this.$route.query.peer) {
            this.$store.commit('setCurrentPeer', this.$route.query.peer);
        }

        if (this.$route.query.token) {
            this.$store.commit('setToken', this.$route.query.token);
        }
    },
    computed: {
        token () {
            return this.$store.state.token;
        }
    },
    watch: {
        '$route' (to, from) {

            if (to.query.peer) {
                this.$store.commit('setCurrentPeer', to.query.peer);
            }

            if (to.query.token) {
                this.$store.commit('addToken', to.query.token);
            }
        }
    }
});