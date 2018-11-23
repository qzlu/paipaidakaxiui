<template>
  <div v-if="showModal">
      <div class="modal-mask" ></div>
      <div class="modal-dialog">
          <div class="close" v-if="showCancle" @click="close()"></div>
          <h3>本内容只对合格投资者开放</h3>
          <div class="content tx-left">
              根据《私募投资基金监督管理暂行办法》之规定，阁下具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人金融类资产不低于300万元或者最近三年个人年均收入不低于50万元人民币。
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    showCancle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    close () {
      this.$emit('close')
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
    font-size: 32rpx;
    text-align: center;
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
    background: #c42220;
    margin: 40rpx auto;
    letter-spacing: 4rpx;
    font-size: 32rpx;
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
</style>
