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
        <div style="height:150px">
          <VSelect  :options="getDataSets" v-model="dataKey" label="Data Selection" />
        </div>
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    Dialog, 'VSelect': vSelect
  },
  name: "Blank",
  props: {
    parentid: String,
    picked: String,
    msg: String,
  },
  data() {
    return {dataKey: 'Select Data', category:null}
  },
  methods: {
    save() {
      console.log(this.dataKey);
    }
  },
  computed: {
    getDataSets() {
      return this.$store.getters.getDataSets;
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