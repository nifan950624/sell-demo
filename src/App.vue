<template>
  <div id="app">
    <home-header></home-header>
    <router-view/>
  </div>
</template>

<script>
import homeHeader from '@/components/header'
export default {
  name: 'App',
  components: {
    homeHeader
  }
}
</script>

<style>

</style>
