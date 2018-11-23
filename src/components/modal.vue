<template>
  <div v-if="showModal">
      <div class="modal-mask" ></div>
      <div class="modal-dialog">
          <div class="close" v-if="showCancle" @click="close()"></div>
          <h3>{{title}}</h3>
          <div :class="{'content':true}">
              <p>请输入手机号码登录</p>
              <div class="input-item">
                  <label v-if="!phoneNumber||!phoneNumber.length">手机号码</label>
                  <input type="text" v-model="phoneNumber">
              </div>
              <div class="input-item">
                  <label v-if="!code||!code.length">验证码</label>
                  <input type="text" v-model="code">
                  <div class="get-message" @click="getCode">
                      <div class="triangle"></div>
                      <div class="text">
                         {{msg}}<span v-if="time">{{time}}</span>
                      </div>
                  </div>
              </div>
              <div class="check"> 
                  <input type="checkbox" checked v-model="check">
                  <p>我已阅读并承认符合<span @click="showModal2=true">合格投资者要求</span></p>
              </div>
          </div>
          <div class="footer">
              <button @click="confirm" v-if="btnText">{{btnText}}</button>
          </div>
          <modal2 :showModal="showModal2" @close="showModal2=false"></modal2>
      </div>
  </div>
</template>

<script>
import modal2 from '@/components/modal2'
import { setTimeout } from 'timers';
export default {
  data () {
      return{
        phoneNumber: null,
        code: null,
        msg: '获取验证码',
        time: 0,
        canSendMsg:true,
        check: true,
        showModal2: false,
      }
  },
  props: {
    showModal: Boolean,
    title: String,
    text: String,
    btnText: String,
    showCancle: {
      type: Boolean,
      default: true
    },
    sign:''

  },
  components: {
    modal2
  },
  watch:{
      time(){
          if(this.time){
              setTimeout(() => {
                  this.time --
              },1000)
          }else{
              _this.canSendMsg = true
              this.msg = '重新发送'
          }
      }
  },
  methods: {
    confirm () {
      this.$emit('confirm',this.code,this.phoneNumber)
    },
    close () {
      this.$emit('close')
    },
    getCode () {
        var _this = this
        var isPhone = /^1[34578]\d{9}$/;//手机号码
        if(!this.canSendMsg){
            wx.showToast({
                title: '稍后再试',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if(!isPhone.test(this.phoneNumber)){
            wx.showToast({
                title: '手机号码不正确',
                icon: 'none',
                duration: 2000
            })
            return
        }
        wx.request({
            url: 'https://weixin.simuwang.com/Gateway/sendSms',
            data: {
                sign: _this.sign,
                phone: _this.phoneNumber,
                source: '20013',
                utm_platform: 'xcx'
            },
            success (res) {
                if(res.data.success){
                    _this.msg = '已发送'
                    _this.time = 60
                    _this.canSendMsg = false
                }else{
                    _this.msg = '重新发送'
                }
            }
        })
    }
  }
}
</script>

<style>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  width: 500rpx;
  position: fixed;
  top: 50%;
  left: 0;
  z-index: 9999;
  background: #f9f9f9;
  margin: -400rpx 85rpx;
  border-radius: 10rpx;
  padding: 40rpx;
  font-size: 28rpx; 
}
.content{
    line-height: 40rpx;
    letter-spacing: 2rpx;
    margin-top: 40rpx;
    text-align:center;
    font-size: 26rpx;
}
.modal-dialog h3{
    font-size: 40rpx;
    text-align: left;
    line-height: 50rpx;
}
.content img{
    width: 350rpx;
}
.modal-dialog button{
    width: 450rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: white;
    border-radius: 40rpx;
    background:linear-gradient(to left, #ee2234, #c1221e);
    margin: 40rpx auto;
    letter-spacing: 4rpx;
    font-size: 34rpx;
}
.close{
    position: absolute;
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
    background:url('https://weixin.simuwang.com/Public/Image/Weixin/201810/close.png') center no-repeat;
    background-size: 50rpx;
    top: -80rpx;
    right: 0rpx;
}
.tx-left{
    text-align: left
}
.input-item{
    position: relative;
    margin-top: 50rpx;
}
.input-item label{
    position: absolute;
    top: 24rpx;
    left: 0;
    font-size: 28rpx;
    color: #666666
}
.input-item input{
    border-bottom: 1rpx solid #cccccc;
    height: 80rpx;
    font-size: 28rpx;
}
.get-message{
    position: absolute;
    top: 24rpx;
    right: 0;
    z-index: 10000
}
.triangle{
    float: left;
    border: 20rpx solid;
    border-color: transparent #c7c6cb transparent transparent;
}
.text{
    margin-left: 39rpx;
    background: #c7c6cb;
    font-size: 24rpx;
    color: #fff;
    padding:0 10rpx;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    cursor: pointer;
}
.check{
    margin-top: 40rpx;
}
.check input{
    float: left;
    width: 28rpx;
    height: 28rpx;
}
.check p{
    font-size: 24rpx;
}
.check span{
    color:#c72221
}
/*checkbox选中后样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background: #c72221;
}
/*checkbox选中后图标样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  text-align: center;
  font-size: 22rpx;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
}

</style>
