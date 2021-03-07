<template>
  <div class='container'>
    <div class='sidenav'>
      <span id='addGrid' class="material-icons mibutton" title="Add Tab" v-on:click='addTab'>note_add</span>

      <span id='addData' class="material-icons mibutton" title="Add Data" @click="$refs.dialog.openModal()">arrow_circle_down</span>
    </div>
    <Dialog ref="dialog">
      <template v-slot:header>
        <b> Select Data </b>
      </template>
      <template v-slot:body>
        <p>
          <b>Add a New Dataset </b>
          <br>
          <br>
          <input v-model="URL" placeholder="Data URL">
          <br>
          <br>
          <input v-model="datasetName" placeholder="Data Set Name">
          <br>
          <br>
          <input type="radio" id="csv" value="csv" v-model="picked">
          <label for="csv">CSV</label>
          <input type="radio" id="json" value="json" v-model="picked">
          <label for="json">JSON</label>
        </p>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.dialog.closeModal()">Cancel</button>
          <button @click="save">Save</button>
        </div>
      </template>
    </Dialog>
    <div class='gridcontainer' id='layoutcontainer'>
      <Grid ref='mainGrid'/>
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import Dialog from './components/Dialog.vue'
export default {
  name: 'App',
  components: {
    Grid, Dialog
  },
  data() {
    return {
      picked: 'csv',
      datasetName: 'iris',
      URL: 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv',
      menuVisible: false
    };
  },

  methods: {
    save() {
      this.$store.commit('addDataset', {url: this.URL, key: this.datasetName, type: this.picked});
      this.$refs.dialog.closeModal();

    },
    addTab() {
      this.$refs.mainGrid.addDataTab();
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  },
  mounted() {
    // document.getElementsByClassName('sidenav')[0].contentEditable = true;
  },
  created() {
  }
}
</script>



<style scoped>


.container {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding-right: 20px;
  border:1px solid black;
}
.sidenav {
  border:1px solid black;
  height: 100%;
  padding: 10px;
}
.mibutton:hover {
  cursor: pointer
}
.gridcontainer {
  padding: 2px;
  height: 100%;
  width: 95%;
  padding-right: 20px;
  border-style: 'solid';
  background: 'black';
}
</style>
