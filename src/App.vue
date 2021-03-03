<template>
  <div class='container'>
    <div class='sidenav'>
      <span class="material-icons" title="Add Data Tab" v-on:click='addTab'>note_add</span>
    </div>
    <div class='gridcontainer' id='layoutcontainer'>
      <Grid ref='mainGrid'/>  
    </div>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'

export default {
  name: 'App',
  components: {
    Grid
  },
  data: () => ({
      menuVisible: false
    }),
  methods: {
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

.gridcontainer {
  padding: 2px;
  height: 100%;
  width: 95%;
  padding-right: 20px;
  border-style: 'solid';
  background: 'black';
}
</style>
