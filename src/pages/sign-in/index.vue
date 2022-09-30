<script lang="ts" setup>
// import Taro from '@tarojs/taro'
import { ws } from '@/services/scoket'
import { ref } from 'vue'
import { getSignToDayApi } from '@/api'
import Mask from '@/components/mask/index.vue'
definePageConfig({
	navigationBarTitleText: '签到',
	navigationBarBackgroundColor: '#fafafa'
})
const signToNowList = ref([])
const getSignToDay = async () => {
	const params = {
		cardID: '20004',
		className: '班级名称1',
		interfaceNum: '47-6'
	}
	const res = await getSignToDayApi(params)
	signToNowList.value = res.data
	flag.value = false
	console.log('%cindex.vue line:15 res', 'color: white; background-color: #007acc;', res)
}
const flag = ref(true)
getSignToDay()
// const stuSginScoket = new ws('/IClassWebsocket/Student/20004')
// stuSginScoket.onMessage(e => {
// 	console.log(e)
// })
// stuSginScoket.send('hellow')

// setTimeout(() => {
// 	stuSginScoket.send('hellowsaghe')
// }, 1000)
//'ws://192.168.5.168:8080/IClassWebsocket/stuname'
// Taro.connectSocket({
// 	url: 'ws://192.168.5.168:8080/IClassWebsocket/stuname'
// })
// Taro.onSocketMessage(function(res) {
// 	console.log('收到服务器内容：' + res.data)
// 	let a = JSON.parse(res.data)
// 	console.log(a.body)
// })
// let obj: any = {
// 	fromUser: 'MY',
// 	body: '获取用户列表'
// }
// obj = JSON.stringify(obj)
// const fn = () => {
// 	Taro.sendSocketMessage({
// 		data: obj
// 	})
// }
</script>
<template>
	<div>
		<div class="card" v-for="item in signToNowList">
			<div class="h1">计算机等级</div>
			<div class="h2">12:00 ~ 13:00</div>
			<div class="h2">还有 30 分钟签到结束</div>
			<div class="teacher">杨老师</div>
			<!-- <div class="button">签到</div> -->
			<nut-button type="info" class="button">签到</nut-button>
			<Mask :show="flag"></Mask>
		</div>
	</div>
</template>

<style lang="scss">
.card {
	width: 90vw;
	height: 230px;
	margin: 10px auto;
	border-radius: 35px;
	background-color: #e2f3ff;
	// background-color: white;
	padding: 30px;
	box-sizing: border-box;
	position: relative;
	& > .h1 {
		width: 100%;
		font-size: 35px;
		padding-bottom: 15px;
	}
	& > .h2 {
		width: 100%;
		margin-top: 20px;
		font-size: 30px;
		color: #626c72;
	}
	& > .teacher {
		position: absolute;
		top: 0;
		right: 0;
		background-color: #2da7fa;
		border-radius: 0px 35px 0 35px;
		box-sizing: border-box;
		padding: 15px 25px;
		color: white;
	}
	& > .button {
		position: absolute;
		top: 110px;
		right: 50px;
		// background-color: #4ab483;
		border-radius: 20px;
		padding: 25px 50px;
		box-sizing: border-box;
		// color: white;
	}
}
</style>
