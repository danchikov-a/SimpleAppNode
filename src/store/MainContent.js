import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/routes/routes";
import cookie from 'vue-cookies';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        editRow: false,
        shawarmas: [],
        shawarmaToSave: null,
        shawarmaEditId: null,
        token: null,
        user: null,
        bucketItems: [],
        amountOfBucketElements: 0,
        minutes: [
            {
                id: 1,
                value: 10,
            },
            {
                id: 1,
                value: 15,
            },
            {
                id: 1,
                value: 20,
            }
        ],
        orders: [],
        locations: [
            {
                id: 1,
                caption: 'Каменка',
            },
            {
                id: 2,
                caption: 'Пушкинская',
            },
        ],
        tempShawarmas: [],
        searchText: '',
        currentLocation: null,
        notifications: [],
    },
    getters: {
        getEditRow(state) {
            return state.editRow;
        },
        getNotifications(state) {
            return state.notifications;
        },
        getCurrentLocation(state) {
            return state.currentLocation;
        },
        getUser(state) {
            return state.user;
        },
        getLocations(state) {
            return state.locations;
        },
        getSearchText(state) {
            return state.searchText;
        },
        getOrders(state) {
            return state.orders;
        },
        getShawarmas(state) {
            return state.shawarmas;
        },
        getTempShawarmas(state) {
            return state.tempShawarmas;
        },
        getShawarmaToSave(state) {
            return state.shawarmaToSave;
        },
        getShawarmaEditId(state) {
            return state.shawarmaEditId;
        },
        getMinutes(state) {
            return state.minutes;
        },
        getAmountOfBucketElements(state) {
            if (state.amountOfBucketElements === null) {
                return 0;
            }

            return state.amountOfBucketElements;
        },
        getBucketItems(state) {
            return state.bucketItems.result;
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
        },
        setAmountOfBucketElements(state, amount) {
            state.amountOfBucketElements = amount;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        setNotifications(state, notifications) {
            state.notifications = notifications;
        },
        setTempShawarmas(state, shawarmas) {
            state.tempShawarmas = shawarmas;
        },
        setBucketItems(state, bucketItems) {
            state.bucketItems = bucketItems;
        },
        setCurrentLocation(state, location) {
            state.currentLocation = location;
        },
        setSearchText(state, searchText) {
            state.searchText = searchText;
        },
    },
    actions: {
        fetchShawarmas({state}) {
            console.log('token', state.token);
            axios.get("http://localhost:3000/api/shawarmas", {
                params: {
                    token: state.token
                }
            }).then(r => {
                state.shawarmas = r.data;
            }).catch(() => {
                router.push('/registration');
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
        },
        addToBucket({state, dispatch}, shawarmaId) {
            axios.post("http://localhost:3000/api/shawarmas/addToBucket", {
                shawarmaId: shawarmaId,
                userId: state.user.user_id,
            }).then(r => {
                console.log('r', r);
                dispatch('fetchAmountOfBucketElements');
                dispatch('fetchBucketItems');
            }).catch(err => {
                console.log('err', err);
            });
        },
        deleteFromBucket({state, dispatch}, shawarmaId) {
            axios.post("http://localhost:3000/api/shawarmas/deleteFromBucket", {
                shawarmaId: shawarmaId,
                userId: state.user.user_id,
            }).then(r => {
                console.log('r', r);
                dispatch('fetchAmountOfBucketElements');
                dispatch('fetchBucketItems');
            }).catch(err => {
                console.log('err', err);
            });
        },
        fetchAmountOfBucketElements({state, commit}) {
            axios.get("http://localhost:3000/api/bucketElements", {
                params: {
                    userId: state.user.user_id,
                }
            }).then(r => {
                console.log('r.data', r.data);
                commit('setAmountOfBucketElements', r.data.amount[0].quantity);
            }).catch(() => {
            });
        },
        fetchBucketItems({state, commit}) {
            axios.get("http://localhost:3000/api/bucketItems", {
                params: {
                    userId: state.user.user_id,
                }
            }).then(r => {
                console.log('r.data', r.data);
                commit('setBucketItems', r.data);
            }).catch(() => {
            });
        },
        fetchOrders({state, commit}) {
            axios.get("http://localhost:3000/api/orders", {
                params: {
                    userId: state.user.user_id,
                }
            }).then(r => {
                commit('setOrders', r.data);
            }).catch(() => {
            });
        },
        orderClicked({state, commit, dispatch}, orderInformation) {
            axios.post("http://localhost:3000/api/order/create", {
                userId: state.user.user_id,
                location: state.currentLocation,
                orderInformation: orderInformation,
            }).then(r => {
                console.log('r.data', r.data);
                commit('setBucketItems', r.data);
                dispatch('fetchAmountOfBucketElements');
            }).catch(() => {
            });
        },
        // eslint-disable-next-line no-empty-pattern
        register({state}, user) {
            axios.post("http://localhost:3000/api/shawarmas/register", {
                name: user.name,
                email: user.email,
                password: user.password,
            },).then(r => {
                state.token = r.data.token;
                cookie.set('token', state.token);
                router.push('/main-content');
            });
        },
        authorize({state}, user) {
            axios.post("http://localhost:3000/api/shawarmas/authorize", {
                email: user.email,
                password: user.password,
            }).then(r => {
                console.log('r.data', r.data);
                state.token = r.data.token;
                state.user = r.data.user;
                router.push('/main-content');
            }).catch(() => {
                router.push('/login');
            });
        },
        fetchNotifications({state, commit}) {
            axios.get("http://localhost:3003/api/notifications", {
                params: {
                    query: `
                        query {
                            notifications {
                                id
                                message
                            }
                        }`,
                }
            }).then(r => {
                console.log(state.user);
                commit('setNotifications', r.data.data.notifications);
            }).catch(() => {
                router.push('/login');
            });
        },
    }
})

export default store