import Vue from 'vue'
import Vuex from 'vuex'
import crossfilter from 'crossfilter'
import axios from 'axios'
import {csv} from 'd3'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        datasets: {},
        dimensions: {}
    },
    mutations: {
        async addDataset(state, obj) {
            let {url, key, type} = obj;
            if(type == 'json') {
                await axios.get(url).then((data) => {
                    Vue.set(state.datasets, key, crossfilter(data))
                })
            } else {
                await csv(url).then((data) => {
                    Vue.set(state.datasets, key, crossfilter(data[0]))
                })
            }
        }
    },
    getters: {
        getDataSets(state) {
            return (Object.keys(state.datasets));
        }
    }
});

export default store;