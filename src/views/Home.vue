<template>
  <div class="home">
    <lazy-img :src="bird" width="300" @click="handleClick" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      bird: require('../assets/bird.png')
    }
  },
  components: {},
  computed: {
    // bird() {
    //   return require('../assets/bird.png')
    // }
  },
  methods: {
    handleClick() {
      this.bird = 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  & > * {
    margin: 1800px 100px 200px;
  }
}
</style>

