<template>
  <div class="container">
      <scroll-view class="content" scroll-y @scroll="scroll">
        <div class="carousel">
          <swiper :indicator-dots="indicatorDots"
          autoplay="autoplay" :interval="interval" :duration="duration" circular>
          <block v-for="item in imgUrls" :key="item">
              <swiper-item >
                  <button  :style="{'background-image':'url(' + url + item.imgUrl +')'}" v-if="!hadGetPhone" open-type="getPhoneNumber"  @getphonenumber="getPhoneNumber" @click="id=item.id"></button>
                  <button  :style="{'background-image':'url(' + url + item.imgUrl +')'}" v-else @click="toVideo(item.id)" ></button> 
              </swiper-item>
          </block>
          </swiper>
        </div>
        <ul :class="{'panel-header':true,'fixed':fixed}">
            <li @click="activeIndex=0" :class="{active:activeIndex===0}">大咖说</li>
            <li @click="activeIndex=1" :class="{active:activeIndex===1}">咖学院</li>
            <li @click="activeIndex=2" :class="{active:activeIndex===2}">咖研报</li>
        </ul>
          <swiper class="video-list" :style="{height:swiperHeight}"  :current = 'activeIndex' @change='change'>
            <block>
                <swiper-item >
                      <ul class="list list1">
                          <li class="list-item" v-for="(item, index) in videoList1" :key="item.url" @click="id=item.id">
                              <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-if="!hadGetPhone" open-type="getPhoneNumber"  @touchstart='animate1(index)' @touchend='animate2(index)' @getphonenumber="getPhoneNumber"></button>
                              <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-else @click="toVideo(item.id)"  @touchstart='animate1(index)' @touchend='animate2(index)'></button> 
                          </li>
                      </ul>
                </swiper-item>
                <swiper-item>
                  <ul class="list">
                      <li class="list-item" v-for="(item, index) in videoList2" :key="item.url" @click="id=item.id">
                          <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-if="!hadGetPhone" open-type="getPhoneNumber"  @touchstart='animate1(index)' @touchend='animate2(index)' @getphonenumber="getPhoneNumber"></button>
                          <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-else @click="toVideo(item.id)"  @touchstart='animate1(index)' @touchend='animate2(index)'></button> 
                      </li>
                  </ul>
                </swiper-item>
                <swiper-item>
                  <ul class="list">
                      <li class="list-item" v-for="(item, index) in videoList3" :key="item.url" @click="id=item.id">
                          <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-if="!hadGetPhone" open-type="getPhoneNumber"  @touchstart='animate1(index)' @touchend='animate2(index)' @getphonenumber="getPhoneNumber"></button>
                          <button :class="{active:item.active}" :style="{'background-image':'url('+ url + item.imgUrl +')'}" v-else @click="toVideo(item.id)"  @touchstart='animate1(index)' @touchend='animate2(index)'></button> 
                      </li>
                  </ul>
                </swiper-item>
            </block>
          </swiper>
      </scroll-view>
      <modal :showModal='showModal' btnText="登录" @confirm='login' @close='showModal=false' :sign="sign"></modal>
  </div>
</template>

<script>
const app = getApp()
import { sa } from '../../utils/sensorsdata'
import modal from '../../components/modal.vue';
export default {
  data () {
    return {
      activeIndex: 0,
      /**
       * 轮播图
       */
      imgUrls: [{
        id: 'w0772onur3g',
        imgUrl: '/Public/Image/Weixin/20181026/swiper1.jpg',
      },{
        id: 'n0791xnp74s',
        imgUrl: '/Public/Image/Weixin/20181026/2-13.jpg',
      },{
        id: 'a0793efosyi',
        imgUrl: '/Public/Image/Weixin/20181026/3-1.jpg',
      }],
      url:'https://www.simuwang.com',
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 500,
      /**
       * 大咖说
       */
      videoList1: [{
        //id: 'w0772onur3g',
        id:'b0800xc933p',
        imgUrl: '/Public/Image/Weixin/20181026/1-1.jpg',
        active:false
      },{
        id: 'p0767v5w69l',
        imgUrl: '/Public/Image/Weixin/20181026/1-2.jpg',
        active:false
      },{
        id: 'o0791urqgd9',
        imgUrl: '/Public/Image/Weixin/20181026/1-3.jpg',
        active:false
      },{
        id: 's0763hcg83j',
        imgUrl: '/Public/Image/Weixin/20181026/1-4.jpg',
        active:false
      },{
        id: 'c0767th2fcw',
        imgUrl: '/Public/Image/Weixin/20181026/1-5.jpg',
        active:false
      },{
        id: 'x0782k9v83w',
        imgUrl: '/Public/Image/Weixin/20181026/1-6.jpg',
        active:false
      },{
        id: 'k0767t1jtcv',
        imgUrl: '/Public/Image/Weixin/20181026/1-8.jpg',
        active:false
      },{
        id: 'f0763iknurg',
        imgUrl: '/Public/Image/Weixin/20181026/1-9.jpg',
        active:false
      },{
        id: 'w07916mdt19',
        imgUrl: '/Public/Image/Weixin/20181026/1-10.jpg',
        active:false
      },{
        id: 'g0782vk1gf4',
        imgUrl: '/Public/Image/Weixin/20181026/1-7.jpg',
        active:false
      }],
      /**
       * 咖学院
       */
      videoList2:[ {
        id: 's0763c153vd',
        imgUrl: '/Public/Image/Weixin/20181026/2-1.jpg',
        active:false
      }, {
        id: 'q0763aakt5d',
        imgUrl: '/Public/Image/Weixin/20181026/2-2.jpg',
        active:false
      }, {
        id: 'q0763bxi24o',
        imgUrl: '/Public/Image/Weixin/20181026/2-3.jpg',
        active:false
      }, {
        id: 'j0763v9nv57',
        imgUrl: '/Public/Image/Weixin/20181026/2-4.jpg',
        active:false
      }, {
        id: 'r0782iooasq',
        imgUrl: '/Public/Image/Weixin/20181026/2-5.jpg',
        active:false
      }, {
        id: 's0782c6u583',
        imgUrl: '/Public/Image/Weixin/20181026/2-6.jpg',
        active:false
      }, {
        id: 'e0706nvaukw',
        imgUrl: '/Public/Image/Weixin/20181026/2-7.jpg',
        active:false
      }, {
        id: 'e0706978lpt',
        imgUrl: '/Public/Image/Weixin/20181026/2-8.jpg',
        active:false
      }, {
        id: 'c0723315kv3',
        imgUrl: '/Public/Image/Weixin/20181026/2-9.jpg',
        active:false
      }, {
        id: 'k0722rf3tal',
        imgUrl: '/Public/Image/Weixin/20181026/2-10.jpg',
        active:false
      }, {
        id: 'd0782bti7ut',
        imgUrl: '/Public/Image/Weixin/20181026/2-11.jpg',
        active:false
      }, {
        id: 't0791x3m9ar',
        imgUrl: '/Public/Image/Weixin/20181026/2-12.jpg',
        active:false
      }, {
        id: 'n0791xnp74s',
        imgUrl: '/Public/Image/Weixin/20181026/2-13.jpg',
        active:false
      }],
      /**
       * 咖研报
       */
      videoList3:[ {
        id: 'a0793efosyi',
        imgUrl: '/Public/Image/Weixin/20181026/3-1.jpg',
        active:false
      },{
        id: 'r0793m0jhj3',
        imgUrl: '/Public/Image/Weixin/20181026/3-2.jpg',
        active:false
      },{
        id: 'w0792mexha6',
        imgUrl: '/Public/Image/Weixin/20181026/3-3.jpg',
        active:false
      }],
      id: null,
      sign: null,
      hadGetPhone: false,
      showModal:false,
      fixed:false,
      height:null,//轮播图高度
      swiperHeight: '5820rpx',
      source:20013
    }
  },
  watch:{
      activeIndex(){
          if(this.activeIndex === 0){
              this.swiperHeight = '5840rpx'
          }else if(this.activeIndex === 1){
              this.swiperHeight = '5396rpx'
          }else{
              this.swiperHeight = '1276rpx'
          }
      }
  },
  components: {
      modal
  },
  methods: {
    /**
     * 点击调到视频观看页面
     * @param {String} id 视频地址id
     */
    toVideo (id) {
      const url = '../video/main?id=' + id
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      let _this = this
      wx.login({
        success: (obj) => {
          wx.request({
            url: 'https://weixin.simuwang.com/gateway/wxLogin',
            // url:'http://weixin-local.simuwang.com:8087/gateway/wxLogin',
            data: {
              code: obj.code,
              configKey: 2
            },
            success: function (params) {
              _this.sign = params.data.sign
            }
          })
        }
      })
    },
    getPhoneNumber (e) {
      if (e.mp.detail.encryptedData !== undefined) {
        var _this = this
        wx.setStorage({
          key: 'hadGetPhone',
          data: true
        })
        wx.request({
          url: 'https://weixin.simuwang.com/gateway/verifyWXUser',
          // url: 'https://weixin-test.simuwang.com/gateway/verifyWXUser',
          // url:'http://weixin-local.simuwang.com:8087/gateway/verifyWXUser',
          data: {
            encryptedData: e.mp.detail.encryptedData,
            iv: e.mp.detail.iv,
            sign: _this.sign,
            source: _this.source
          },
          success: function (params) {
            if (params.data.success) {
              sa.login(params.data.userid)
              sa.init()
              app.sensors.track('SignUp', {
                $latest_utm_sign: '20013',
                $latest_utm_platform: 'xcx'
              })
            }
          }
        })
        this.toVideo(this.id)
      } else {
        this.showModal = true
      }
    },
    /**
     * 登录
     * @param {String} code 短信验证码
     */
    login (code, phoneNumber) {
        var _this = this
        if(code.length!==4){
             wx.showToast({
                title: '请输入正确的验证码',
                icon: 'none',
                duration: 2000
            })
            return
        }
        wx.request({
            url: 'https://weixin.simuwang.com/Gateway/loginWithSms',
            data: {
                sign: _this.sign,
                phone:phoneNumber,
                code:code,
                source: _this.source,
                utm_platform: 'xcx'
            },
            success (res) {
                if(res.data.success){
                    wx.setStorage({
                        key: 'hadGetPhone',
                        data: true
                    })
                    sa.login(res.data.userid)
                    sa.init()
                    if(res.data.is_register){
                        app.sensors.track('SignUp', {
                            $latest_utm_sign: _this.source,
                            $latest_utm_platform: 'xcx'
                        })
                    }
                    _this.showModal = false
                    _this.toVideo(_this.id)
                }else{
                    wx.showToast({
                        title: '验证码不正确',
                        icon: 'none',
                        duration: 2000
                    }) 
                }
            }
        })
    },
    animate1 (index) {
        let arr = 'videoList' + (this.activeIndex+1)
        this[arr][index].active = true
    },
    animate2 (index) {
        let arr = 'videoList' + (this.activeIndex+1)
        this[arr][index].active = false
    },
    scroll(e){
        if(e.mp.detail.scrollTop >= this.height){
            this.fixed = true
        }else{
            this.fixed = false
        }
    },
    change(e){
        this.activeIndex = e.mp.detail.current
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    app.sensors.registerApp({
        PlatformType: '小程序',
        VisitorIdentity: '用户',
        $latest_utm_sign: '20013',
        xcx_type:'视频小程序'
    });
    //神策统计添加自定义属性
    app.sensors.para.autoTrack.appLaunch={
      $latest_utm_sign: '20013',
      $latest_utm_platform: 'xcx',
      PlatformType: '小程序',
      VisitorIdentity: '用户',
      xcx_type:'视频小程序'
    }
    app.sensors.para.autoTrack.appShow={
      $latest_utm_sign: '20013',
      $latest_utm_platform: 'xcx',
      PlatformType: '小程序',
      VisitorIdentity: '用户',
      xcx_type:'视频小程序'
    }
    app.sensors.para.autoTrack.pageShow={
      $latest_utm_sign: '20013',
      $latest_utm_platform: 'xcx',
      xcx_type:'视频小程序' 
    }
  },
  mounted(){
      if(this.$root.$mp.query.utm_source){
          this.source = this.$root.$mp.query.utm_source
      }
  },
  onShow(){
    var _this = this
    wx.getStorage({
      key: 'hadGetPhone',
      success: function(res) {
        _this.hadGetPhone = res.data
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.height = res.windowWidth/750 *400
      },
    })
  },
  /**
   * 分享
   */
  onShareAppMessage (res) {
    return {
      title: '这里有超值私募干货，一起来看',
      imageUrl:'https://www.simuwang.com/Public/Image/Weixin/20181026/1-1.jpg',
      path: 'pages/index/main?utm_source=20013&utm_platform=xcx&xcx_type=视频小程序',
    }
  },
  onPageScroll:function(e){
    console.log(e);//{scrollTop:99}
  }
}
</script>

<style scoped>
.container{
    background: #32353c;
    overflow:hidden;
}
.content{
   height: 100%; 
}
.carousel{
    height: 400rpx;
    overflow: hidden;
}
.carousel swiper {
    height: 400rpx;
}
.carousel button{
    width: 750rpx;
    height: 400rpx;
    background-size: 100% 100%
}
.panel-header{
    width: 100%;
    display: flex;
    border-bottom: 2rpx solid #cccccc;
}
.fixed{
    position: fixed;
    top: 20px;
    left: 0;
    z-index: 1000;
}
.panel-header li{
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    color: black;
    background: white;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
}
.panel-header li.active{
    color: darkgoldenrod;
    border-bottom: 4rpx solid darkgoldenrod
}
.list{
    text-align: center;
    padding: 10rpx 20rpx;
}
.list button{
    width: 100%;
    height: 400rpx;
    border-radius: 0;
    transition: 0.5s
}
.list-item{
    padding: 6rpx 0;
    overflow: hidden;
}
.list-item button{
    width: 100%;
    height: 400rpx;
    border-radius: 0;
    transition: 0.5s
}
.list.list1 .list-item button{
    height: 568rpx;
}
/* .list-item button:active{
    transform: scale(0.95,0.95);
    background-size: 120% !important
} */
button.active{
    transform: scale(0.95,0.95);
    background-size: 120% !important
}
.list-item button{
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
button::after {
    border-radius: 0;
    border: none
}

</style>
