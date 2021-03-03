<template>
  <div class="grid"></div>
</template>

<script>
import Vue from "vue";
import { GoldenLayout } from "golden-layout";
import "golden-layout/dist/css/goldenlayout-base.css";
import "golden-layout/dist/css/themes/goldenlayout-light-theme.css";
import "vue-slimgrid/dist/slimgrid.css";

import SlimGrid from "vue-slimgrid";
import Test from "./Test.vue";

var config = {
  content: [
    {
      type: "row",
      content: [
        {
          type: "component",
          componentName: "testComponent",
          componentState: { label: "A" },
        },
        {
          type: "column",
          content: [
            {
              type: "component",
              componentName: "testComponent",
              componentState: { label: "B" },
            },
            {
              type: "component",
              componentName: "gridComponent",
              componentState: { label: "C" },
            },
          ],
        },
      ],
    },
  ],
};

const SlimGridComponent = function (container, state) {
  const SlimGridConstructor = Vue.extend(SlimGrid);
  let data = [];
  for (let i = 0; i < 1000; i++) {
    let row = { id: i };
    for (let j = 0; j < 6; j++) {
      row["column-" + j] = i * j;
    }
    data.push(row);
  }
  let subcontainer = container.getElement()
  subcontainer.id = state.label;
  
  Vue.nextTick(() => {
    let obj = new SlimGridConstructor();
    obj.data = data;
    obj.$mount("#" + state.label);
  })
  return(subcontainer);
};

const TestComponent = function (container, state) {
  const TestConstructor = Vue.extend(Test);
  this.obj = new TestConstructor();
  this.obj.msg = "Hello Stuff";
  let subcontainer = container.getElement();
  subcontainer.id = state.label;
  Vue.nextTick(() => {
    this.obj.$mount("#" + state.label);
  });
  return subcontainer;
};

export default {
  name: "Grid",
  props: {
    msg: String,
  },
  data: function () {
    return { myLayout: null };
  },
  methods: {
    gridResizeHandler() {
      const { offsetWidth, offsetHeight } = document.getElementById(
        "layoutcontainer"
      );
      this.myLayout.updateSize(offsetWidth, offsetHeight);
    },
    addDataTab() {
      console.log('boo');
    }
  },
  created() {
    window.addEventListener("resize", this.gridResizeHandler);
  },
  mounted() {
    const container = document.getElementById("layoutcontainer");
    this.myLayout = new GoldenLayout(config, container);
    this.myLayout.registerComponent("testComponent", TestComponent);
    this.myLayout.registerComponent("gridComponent", SlimGridComponent);
    this.myLayout.init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
