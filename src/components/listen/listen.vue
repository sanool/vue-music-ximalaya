<template>
  <div class="listen">
    <div class="listen-name">{{playingIndex+'. '+musicName}}</div>
    <div class="listen-singer">{{musicSonger}}</div>
    <div class="listen-singer" v-if="isBuffering">loading...</div>
    <div class="listen-middle">
      <div class="listen-middle-panel">
        <div class="listen-middle-panel-div">
          <div class="listen-middle-image-rotate" :class="{'stop':isPaused}">
            <img class="listen-middle-image" :src="imageUrl"></img>
          </div>
        </div>
      </div>
    </div>
    <div class="listen-bottom">
      <div class="listen-bottom-process">
        <div class="listen-bottom-starttime">{{musicCurTime}}</div>
        <div id="processLineId" class="listen-bottom-process-line" @click="changeProcess($event)">
          <div class="listen-bottom-process-nowlen" :style="{'width':processPercent+'%'}"></div>
        </div>
        <div class="listen-bottom-endtime" v-if="!isBuffering">{{musicTotalTime}}</div>
        <div class="listen-bottom-endtime" v-if="isBuffering">...</div>
      </div>
      <audio id="musicAudio" autoplay="autoplay" :src="musicSrc"></audio>
      <div class="listen-bottom-btns">
        <div :class="{'icon-loop':playWay===0,'icon-suiji':playWay===1,'icon-danqu':playWay===2}"
             @click="changePlayWay"></div>
        <div class="icon-previous" @click="previousMusic"></div>
        <div class="listen-play-status" :class="{'icon-play':isPaused,'icon-pause':!isPaused}"
             @click="playOrPause"></div>
        <div class="icon-next" @click="nextMusic"></div>
        <div class="icon-love listen-play-love" :class="{'loved':isLike}" @click="loveMusic(playingIndex)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  let changeSeconds = function (seconds) {
    let minute = parseInt(Math.floor(seconds / 60), 10)
    let minuteStr = minute < 10 ? ('0' + minute) : minute
    let second = parseInt(Math.floor(seconds % 60), 10)
    let secondStr = second < 10 ? ('0' + second) : second
    return minuteStr + ':' + secondStr
  }
  let randomIndex = function (startNum, endNum) {
    return Math.floor(Math.random() * (endNum - startNum) + startNum)
  }
  let setOneMusicInfo = function (_this, musicInfo) {
    _this.musicName = musicInfo.trackName
    _this.musicSonger = musicInfo.albumName
    _this.musicSrc = musicInfo.src
    _this.imageUrl = musicInfo.trackCoverPath
    _this.isLike = musicInfo.isLike
  }
  let setOneMusicInfo163 = function (_this, musicInfo) {
    _this.musicName = musicInfo.name
    let musicSonger = ''
    musicInfo.ar.forEach(function (item) {
      musicSonger = musicSonger + item.name + ' '
    })
    _this.musicSonger = musicSonger
    _this.musicSrc = musicInfo.src
    _this.imageUrl = musicInfo.al.picUrl
    _this.isLike = false
  }
  export default {
    name: "listen",
    data() {
      return {
        isPaused: false,
        isBuffering: true,
        processPercent: 0,
        musicCurTime: '00:00',
        musicTotalTime: '00:00',
        playingIndex: 26,
        playWay: 0,
        playWays: ['shunxu', 'suiji', 'danqu'],
        // music info
        musicName: '',
        musicSonger: '',
        musicSrc: '',
        imageUrl: '',
        isLike: false,
        tracksAudioPlay: []
      }
    },
    methods: {
      setProcessPercent() {
        this.intervalProcess = setInterval(() => {
          let duration = musicAudio.duration
          let currentTime = musicAudio.currentTime
          let processPercent = Math.floor(currentTime * 1000 / duration) / 1000
          this.processPercent = processPercent * 100
          let curTime = processPercent * duration
          if (!isNaN(curTime)) {
            this.musicCurTime = changeSeconds(processPercent * duration)
            console.log(curTime)
          }
        }, 1000)
      },
      playOrPause() {
        this.isPaused = !this.isPaused
        if (this.isPaused) {
          clearInterval(this.intervalProcess)
          musicAudio.pause();
        } else if (!this.isPaused) {
          this.setProcessPercent()
          musicAudio.play();
        }
      },
      previousMusic() {
        let playingIndex = this.playingIndex, musicInfo
        switch (this.playWay) {
          case 1:
            playingIndex = randomIndex(0, this.tracksAudioPlay.length)
            musicInfo = this.tracksAudioPlay[playingIndex]
            break;
          default:
            let length = this.tracksAudioPlay.length
            playingIndex = (--playingIndex + length) % (length)
            musicInfo = this.tracksAudioPlay[playingIndex]
            break;
        }
        setOneMusicInfo(this, musicInfo)
        this.playingIndex = playingIndex
        if(this.isPaused){
          this.isPaused = false
          this.setProcessPercent()
        }
      },
      nextMusic() {
        let playingIndex = this.playingIndex, musicInfo = {}
        switch (this.playWay) {
          case 1:
            playingIndex = randomIndex(0, this.tracksAudioPlay.length)
            musicInfo = this.tracksAudioPlay[playingIndex]
            break;
          default:
            playingIndex = (++playingIndex) % (this.tracksAudioPlay.length)
            musicInfo = this.tracksAudioPlay[playingIndex]
            break;
        }
        setOneMusicInfo(this, musicInfo)
        this.playingIndex = playingIndex
        if(this.isPaused){
          this.isPaused = false
          this.setProcessPercent()
        }
      },
      changePlayWay() {
        let playWay = this.playWay
        playWay++
        this.playWay = Math.floor(playWay % 3)
        if (this.playWay === 2) {
          musicAudio.loop = true
        } else {
          musicAudio.loop = false
        }
      },
      loveMusic() {

        window.open('http://audio.xmcdn.com/group41/M04/90/E0/wKgJ8lrDAm7i5NkcABr-v5Vrfrs688.m4a')
      },
      changeProcess(event) {
        if (event && event.offsetX) {
          let processDiv = document.getElementById('processLineId');
          let processWidth = processDiv.offsetWidth;
          let offsetX = event.offsetX;
          if (offsetX > 0 && offsetX <= processWidth) {
            let percent = Math.floor(offsetX * 1000 / processWidth) / 1000
            let duration = musicAudio.duration
            let curTime = percent * duration
            if (!isNaN(curTime)) {
              this.musicCurTime = changeSeconds(curTime)
            }
            this.processPercent = percent * 100
            musicAudio.currentTime = duration * percent
          }
        }
      }
    },
    computed: {},
    mounted() {
      this.axios.get('src/json/songsList.json').then((response) => {
        this.tracksAudioPlay = response.data.data.tracksAudioPlay

        if (musicAudio && this.tracksAudioPlay.length > 0) {
          let musicInfo = this.tracksAudioPlay[this.playingIndex]
          setOneMusicInfo(this, musicInfo)
          musicAudio.addEventListener("waiting", () => {
            this.isBuffering = true
          }, false)
          musicAudio.addEventListener("canplaythrough", () => {
            this.isBuffering = false
            let duration = musicAudio.duration
            this.musicTotalTime = changeSeconds(duration)
          }, false)
          musicAudio.addEventListener("ended", () => {
            let playWay = this.playWay
            let playingIndex = this.playingIndex
            switch (playWay) {
              case 1:
                playingIndex = randomIndex(0, this.tracksAudioPlay.length)
                break;
              default:
                playingIndex = (++playingIndex) % (this.tracksAudioPlay.length)
                break;
            }
            this.playingIndex = playingIndex
            musicInfo = this.tracksAudioPlay[playingIndex]
            setOneMusicInfo(this, musicInfo)
          }, false)
        }
        this.setProcessPercent()
      }, function (error) {
        console.log('get songsList.json error')
      })
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
    background: #676562;
  }

  .listen-name {
    font-size: 1.3em;
    color: #fff;
    margin: auto;
    width: 72%;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
    text-align: center;
  }

  .listen-singer {
    margin: auto;
    width: 50%;
    text-align: center;
    padding: 0 10px;
    color: white;
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
    display: block;
    margin: 0 7px 18px 17px;
  }

  .listen-bottom-starttime {
    display: inline-block;
    padding: 0 3px 0 3px;
    color: #fff;
    font-size: 10px;
    width: 10%;
    overflow: hidden;
  }

  .listen-bottom-process-line {
    display: inline-block;
    width: 70%;
    background: #c4bfbf;
    height: 4px;
    margin-bottom: 6px;
  }

  .listen-bottom-endtime {
    display: inline-block;
    padding: 0 3px 0 3px;
    color: #e0dede;
    font-size: 10px;
    width: 10%;
    overflow: hidden;
  }

  .listen-bottom-process-nowlen {
    background: red;
    height: 4px;
  }

  .listen-bottom-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5em;
    color: #fff;
  }

  .listen-play-status {
    font-size: 2em;
  }

  .listen-play-love {
    color: #fff;
  }

  .listen-play-love.loved {
    color: red;
  }
</style>
