import Vue from 'vue'
import Vuex from 'vuex'
import crossfilter from 'crossfilter'
import axios from 'axios'
import {csv} from 'd3'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        datasets: {},
        columns: {},
        dimensions: {}
    },
    mutations: {
        async addDataset(state, obj) {
            let {url, key, type} = obj;
            if(type == 'json') {
                await axios.get(url).then((data) => {
                    Vue.set(state.datasets, key, crossfilter(data))
                    Vue.set(state.columns, key, Object.keys(data[0]))
                })
            } else {
                await csv(url).then((data) => {
                    Vue.set(state.datasets, key, crossfilter(data[0]))
                    Vue.set(state.columns, key, data.columns)
                })
            }
        }
    },
    getters: {
        getDataSets(state) {
            console.log(state.datasets);
            return (Object.keys(state.datasets));
        },
        getColumns (state) {
            return (query) => {
                console.log(query);
                return(state.columns[query]);
            }

        } 
    }
});

export default store;