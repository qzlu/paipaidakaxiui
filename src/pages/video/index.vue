<template>
  <div class="container">
      <video class="video" v-if="url" :src="url" autoplay ></video>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello World',
      url: ''
    }
  },

  components: {
  },

  methods: {
    /**
     *  根据id获取腾讯视频地址
     */
    getVideoUrl (id) {
      let _this = this
      wx.request({
        url: 'https://vv.video.qq.com/getinfo',
        data: {
          vids: id,
          platform: '101001',
          charge: 0,
          otype: 'json'
        },
        success (res) {
          let json = JSON.parse(res.data.split('=')[1].replace(/;$/, ''))
          _this.url = json.vl ? json.vl.vi[0].ul.ui[0].url + json.vl.vi[0].fn + '?vkey=' + json.vl.vi[0].fvkey : ''
        }
      })
    }
  },

  created () {
  },
  mounted () {
    this.getVideoUrl(this.$root.$mp.query.id)
  }
}
</script>

<style scoped>
.container{
    background: #32353c;
    height: 100%;
}
.video{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -225rpx;

}

</style>
