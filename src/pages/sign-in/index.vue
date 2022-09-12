<script lang="ts" setup>
definePageConfig({ navigationBarTitleText: '签到', navigationBarBackgroundColor: '#fafafa' })
import Taro from '@tarojs/taro'
Taro.connectSocket({
	url: 'ws://192.168.5.168:8080/IClassWebsocket/stuname'
})
Taro.onSocketMessage(function(res) {
	console.log('收到服务器内容：' + res.data)
	let a = JSON.parse(res.data)
	console.log(a.body)
})
let obj: any = {
	fromUser: 'MY',
	body: '获取用户列表'
}
obj = JSON.stringify(obj)
const fn = () => {
	Taro.sendSocketMessage({
		data: obj
	})
}
</script>
<template>
	<div>
		<nut-button type="info" @click="fn">签到</nut-button>
	</div>
</template>

<style lang="scss">
page {
	background-color: #fafafa;
}
</style>
