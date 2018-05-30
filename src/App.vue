<template>
  <div id="app">
    <button @click="test">test</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    methods:{
    test(){
      alert("s")
      axios.post('http://music.163.com/weapi/v3/playlist/detail?csrf_token=cd07ff3f7440e5d1bb847bcc75e5804f')
        .then(function (response) {
          alert("xiedongli");
        })
        .catch(function (response) {
          console.log(response);
        });
    }
    }
}
</script>

<style lang="scss">
</style>
