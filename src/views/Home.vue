<template lang="pug">
div.wrapper
    img(src="../assets/logo.png")
    h1 Vue 3 SSR & HMR

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home'  
})
</script>

<style lang="sass">
img 
    max-width: 120px
    width: 100%
h1
    text-align: center
    
.wrapper 
    width: 100vw
    height: 100vh
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
</style>
