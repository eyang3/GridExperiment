<template>
  <div class="grid">
  </div>
</template>

<script>
import { GoldenLayout } from 'golden-layout'
import 'golden-layout/dist/css/goldenlayout-base.css'
import 'golden-layout/dist/css/themes/goldenlayout-light-theme.css'

var config = {
    content: [{
        type: 'row',
        content:[{
            type: 'component',
            componentName: 'testComponent',
            componentState: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'B' }
            },{
                type: 'component',
                componentName: 'testComponent',
                componentState: { label: 'C' }
            }]
        }]
    }]
};

export default {
  name: 'Grid',
  props: {
    msg: String
  },
  data: function() {
    return {myLayout: null}
  },
  methods: {
    gridResizeHandler() {
      const {offsetWidth, offsetHeight} = document.getElementById('layoutcontainer');
      this.myLayout.updateSize(offsetWidth, offsetHeight)
    }
  },
  created() {
    window.addEventListener("resize", this.gridResizeHandler);
  },
  mounted() {
    const container = document.getElementById('layoutcontainer');
    this.myLayout = new GoldenLayout( config , container);
    
    this.myLayout.registerComponent( 'testComponent', function( container, componentState ){
      console.log(componentState);
      container.getElement().innerHTML = 'Hello';
               // container.title = 'Hello Nurse';
      return(container);
    });
    this.myLayout.init()
  }
}
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
