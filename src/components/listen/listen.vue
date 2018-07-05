<template>
  <div class="listen">
    <div class="listen-title"></div>
    <div class="listen-author"></div>
    <div class="listen-middle">
      <img class="listen-middle-image" src="http://imagev2.xmcdn.com/group44/M08/07/FC/wKgKkVso4yiDs7AyAAs38jSawfs921.png!op_type=5&upload_type=album&device_type=ios&name=web_large&strip=0&quality=7"></img>
    </div>
    <div class="listen-play"></div>
  </div>
</template>

<script>
  export default {
    name: "listen"
  }
</script>

<style scoped>
  .listen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .listen-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
