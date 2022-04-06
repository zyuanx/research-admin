<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(process.env)
  }
};
</script>

<style lang="scss">
</style>
