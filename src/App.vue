<template>
  <div id="app" class="main-wrapper">
    <div class="row column">
      <vimeo></vimeo>
    </div>
  </div>
</template>

<script>
  import Vimeo from './components/Vimeo'

  export default {
    components: {
      Vimeo
    }
  }
</script>

<style>
  .main-wrapper {
    color: white;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }
</style>
