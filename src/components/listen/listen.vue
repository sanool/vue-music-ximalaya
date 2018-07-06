<template>
  <div class="listen">
    <div class="listen-title"></div>
    <div class="listen-author"></div>
    <div class="listen-middle">
      <div class="listen-middle-panel">
        <div class="listen-middle-panel-div">
          <div class="listen-middle-image-rotate" :class="{'stop':isPaused}">
            <img class="listen-middle-image"
                 src="http://imagev2.xmcdn.com/group44/M08/07/FC/wKgKkVso4yiDs7AyAAs38jSawfs921.png!op_type=5&upload_type=album&device_type=ios&name=web_large&strip=0&quality=7"></img>
          </div>
        </div>
      </div>
    </div>
    <div class="listen-bottom">
      <div class="listen-bottom-process">
        <div class="listen-bottom-process-nowlen" :style="{'width':processPercent+'%'}"></div>
      </div>
      <audio id="musicAudio" loop="loop" autoplay="autoplay" :src="musicSrc">
      </audio>
      <div class="listen-bottom-btns">
        <div class="icon-play listen-play-method" @click=""></div>
        <div class="icon-play listen-play-previous" @click=""></div>
        <div class="listen-play-status" :class="{'icon-play':isPaused,'icon-pause':!isPaused}"
             @click="playOrPause"></div>
        <div class="icon-pause listen-play-next" @click=""></div>
        <div class="icon-play listen-play-love" @click=""></div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "listen",
    data(){
      return {
        isPaused: false,
        processPercent: 0,
        musicAudioTime: 0,
        musicSrc: '/src/json/linyuyizhizou.mp3'
      }
    },
    methods: {
      setProcessPercent(){
        this.timeOut = setInterval(() => {
          if(musicAudio.currentTime){
            this.processPercent=Math.floor(musicAudio.currentTime*1000/musicAudio.duration)/10
            console.log(this.processPercent)
          }
        }, 1000)
      },
      playOrPause(){
        this.isPaused = !this.isPaused
        let musicAudio = document.getElementById('musicAudio')
        let musicAudioTime = musicAudio.duration
        if(this.isPaused){
          clearTimeout(this.timeOut)
        }else {
          this.setProcessPercent(musicAudioTime)
        }
        if (musicAudio.paused) {
          musicAudio.play();
        } else {
          musicAudio.pause();
        }
        this.musicAudioTime = musicAudioTime
        this.secondPercent = 100/(musicAudioTime)
      }
    },
    mounted(){
      if(this.timeOut){
        clearInterval(this.timeOut)
      }
      this.setProcessPercent()
    }
  }
</script>

<style scoped>
  .listen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #a6a7a7;
  }

  .listen-title {

  }

  .listen-author {

  }

  .listen-middle {
    position: absolute;
    top: 165px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .listen-middle-panel {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
  }

  .listen-middle-panel-div {
    position: absolute;
    left: 15%;
    top: 0;
    width: 70%;
    height: 87%;
  }

  .listen-middle-image-rotate {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 45px solid hsla(0, 0%, 3%, 0.8);
    border-radius: 50%;
    animation: myrotate 20s linear infinite;
  }

  .listen-middle-image-rotate.stop {
    animation-play-state: paused;
  }

  @keyframes myrotate {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(1turn)
    }
  }

  .listen-middle-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .listen-bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
  }

  .listen-bottom-process {
    width: 83%;
    margin: 0 0 29px 36px;
    background: #c4bfbf;
    height: 4px;
  }

  .listen-bottom-process-nowlen {
    width: 50%;
    background: red;
    height: 4px;
  }

  .listen-bottom-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 2em;
    color: #fff;
  }

  .listen-play-status {
    font-size: 1.5em;
  }
</style>
