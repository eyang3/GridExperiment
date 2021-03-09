<template>
  <div class="content">
    {{getDataSets}}
    <div class="vertical-center">
      <button @click="$refs.dialog.openModal()">Configure Data</button>
    </div>
    <Dialog ref="dialog"> </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";

export default {
  components: {
    Dialog,
  },
  name: "Blank",
  props: {
    picked: String,
    parentid: String,
    msg: String,
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