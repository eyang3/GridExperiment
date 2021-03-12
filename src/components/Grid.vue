<template>
  <div class="grid"></div>
</template>

<script>
import Vue from "vue";
import { GoldenLayout } from "golden-layout";
import "golden-layout/dist/css/goldenlayout-base.css";
import "golden-layout/dist/css/themes/goldenlayout-light-theme.css";
import "vue-slimgrid/dist/slimgrid.css";
import store from '../store/store.js'

import SlimGrid from "vue-slimgrid";
import Blank from "./Blank.vue";

var config = {
  settings: {
        selectionEnabled: true
      },
  content: [
    { 
      type: "row", 
      content: [
        {
          type: "component",
          componentName: "blankComponent",
          componentState: { id: Math.random().toString(36).substr(2, 9) },
        },
         {
          type: "component",
          componentName: "blankComponent",
          componentState: { id: Math.random().toString(36).substr(2, 9) },
        },
      ]
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

const BlankComponent = function (container) {
  const BlankConstructor = Vue.extend(Blank);
  this.obj = new BlankConstructor({store});
  let subcontainer = container.getElement();
  this.obj.$mount();
  subcontainer.appendChild(this.obj.$el);
  return(subcontainer);
    
}

var parseHTML = function(str) {
  var tmp = document.implementation.createHTMLDocument();
  tmp.body.innerHTML = str;
  return tmp.body.children;
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
      let newItemConfig = {
          type: "component",
          componentName: "blankComponent",
          componentState: { id: Math.random().toString(36).substr(2, 9) },
      };
      this.myLayout.root.contentItems[0].addItem(newItemConfig);
    }
  },
  created() {
    window.addEventListener("resize", this.gridResizeHandler);
  },
  mounted() {
    const container = document.getElementById("layoutcontainer");
    this.myLayout = new GoldenLayout(config, container );
    this.myLayout.registerComponent("blankComponent", BlankComponent);
    this.myLayout.registerComponent("gridComponent", SlimGridComponent);

   
    this.myLayout.init();
    this.myLayout.on('stackCreated', function(stack) {
          let html_string = "<span class='material-icons-outlined mibutton headericon' style='font-size:16px'>settings</span>"
          let html = parseHTML(html_string);
          console.log(html);
          stack._target._header.controlsContainer.prepend(html[0]);
          // stack.header.controlsContainer.prepend('<span class="material-icons mibutton">settings</span>');

    });

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
