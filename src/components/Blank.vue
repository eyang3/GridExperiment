<template>
  <div class="content">
    <div class="vertical-center">
      <button @click="$refs.dialog.openModal()">Configure Data</button>
    </div>
    <Dialog ref="dialog">
      <template v-slot:header>
        <b> Select Data </b>
      </template>
      <template v-slot:body>
        <div style="height: 300px">
          Select Dataset:
          <VSelect
            :options="getDataSets"
            v-model="dataKey"
            label="Data Selection"
          />
          <br>
          Select Chart Type: <VSelect
            :options="chartTypes"
            v-model="chartType"
            label="Chart Type"
          />
          <br>
          <div v-for="(item, index) in getConfig" v-bind:key="index">
            {{index}}
            <VSelect v-if="item == 'column'" :options="getColumns" :value="index" v-model="chartcfg[index]" />
            <br>
          </div>
        </div>
        <br>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.dialog.closeModal()">Cancel</button>
          <button @click="save">Save</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import configs from './chartConfig'
export default {
  components: {
    Dialog,
    VSelect: vSelect,
  },
  name: "Blank",
  props: {
    parentid: String,
    picked: String,
    msg: String,
  },
  data() {
    return { dataKey: "", 
    category: null, chartTypes: ['scatter', 'line', 'bar'], chartType: '',
    chartcfg: {} 
    };
  },
  methods: {
    save() {
      
      console.log(this.dataKey);
    },
  },
  computed: {
    getDataSets() {
      return this.$store.getters.getDataSets;
    },
    getColumns() {
      if(this.chartType !== 'Select Chart Type') {
        return this.$store.getters.getColumns(this.dataKey);  
      }
      return([]);
    },
    getConfig() {
      return(configs[this.chartType]);
    },
    getDataColumns() {
      if(this.dataKey != 'Select Data') {
        return this.$store.getters.getColumns(this.dataKey);  
      }
      return ['one'];
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.content {
  display: flex;
  align-items: stretch;
  height: 100%;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>