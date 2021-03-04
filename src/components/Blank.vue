<template>
  <div class="content">
    <div class="vertical-center">
      <button>Centered Button</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Blank',
  props: {
    parentid: String,
    msg: String
  },
  mounted() {
    console.log('boo');
  }


}
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
  transform: translate(-50%, -50%)
}
</style>