import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: { },
        groups: {},
        peer: 0,
        token: ''
    },
    getters: {
        users: state => state.users,
        groups: state => state.groups,
        peerById: (state) => (peer_id) => {
            return (peer_id > 0 ? state.users[peer_id] : state.groups[-peer_id]);
        },
        currentPeer: state => state.peer,
        token: state => state.token
    },
    mutations: {
        addUser (state, user) {
            state.users[user.id] = user;
        },
        addGroup (state, group) {
            state.groups[group.id] = group;
        },
        setToken (state, token) {
            state.token = token;
        },
        setCurrentPeer (state, peer) {
            state.peer = peer;
        },
    },
    plugins: [createPersistedState()]
});