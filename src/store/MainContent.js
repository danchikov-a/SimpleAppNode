import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        editRow: false,
        shawarmas: [],
        shawarmaToSave: null,
        shawarmaEditId: null,
    },
    getters: {
        getEditRow(state) {
            return state.editRow;
        },
        getShawarmas(state) {
            return state.shawarmas;
        },
        getShawarmaToSave(state) {
            return state.shawarmaToSave;
        },
        getShawarmaEditId(state) {
            return state.shawarmaEditId;
        }
    },
    mutations: {
        changeEditRow(state) {
            state.editRow = !state.editRow;
        },
        setShawarmaToSave(state, value) {
            state.shawarmaToSave = value;
        },
        setShawarmaEditId(state, id) {
            state.shawarmaEditId = id;
        }
    },
    actions: {
        fetchShawarmas({state}) {
            axios.get("http://localhost:3000/api/shawarmas").then(r => {
                state.shawarmas = r.data;
            });
        },
        saveShawarma({state, dispatch}) {
            console.log('shawarmaToSave', state.shawarmaToSave);
            axios.post("http://localhost:3000/api/shawarmas/create", {
                shawarma: state.shawarmaToSave,
            }).then(r => {
                state.editRow = false;
                dispatch('fetchShawarmas');
                console.log('r', r);
            }).catch(err => {
                console.log('err', err);
            });
        },
        deleteShawarma({dispatch}, id) {
            console.log('id', id);
            axios.post("http://localhost:3000/api/shawarmas/delete", {
                shawarmaId: id,
            }).then(r => {
                dispatch('fetchShawarmas');
                console.log('r', r);
            }).catch(err => {
                console.log('err', err);
            });
        },
        updateShawarma({state, dispatch}) {
            axios.post("http://localhost:3000/api/shawarmas/update", {
                shawarma: state.shawarmaToSave,
            }).then(r => {
                state.editRow = false;
                dispatch('fetchShawarmas');
                state.shawarmaEditId = null;
                console.log('r', r);
            }).catch(err => {
                console.log('err', err);
            });
        }
    }
})

export default store