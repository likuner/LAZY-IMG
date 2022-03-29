<template>
  <div class="home">
    <lazy-img :src="bird" width="300" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  computed: {
    bird() {
      return require('../assets/bird.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  height: 2000px;
  overflow-y: auto;
  & > * {
    margin-top: 1800px;
  }
}
</style>

