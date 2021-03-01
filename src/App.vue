<template lang="pug">
div
  router-view 

</template>

<script lang="ts">
import { defineComponent } from "vue";
            
export default defineComponent({
  name: "App"
});
</script>


<style lang="sass">
.container
	height: 100vh

body
	height: 100%
	margin: 0
	overflow-x: hidden
	overflow-y: auto
	background-color: #222222
	font-weight: 400
	color: #fff
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
</style>
