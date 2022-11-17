<script lang="ts" setup>
import dayjs from 'dayjs'
import empty from '@/components/empty-page/index.vue'
import { useWifi, useCountDown } from '@/composables'
import Svg from '@/assets/img/image'
import { setReactive } from '@/utils/setReactive'
import { signInIO } from '@/services'
definePageConfig({
	navigationBarTitleText: '签到'
})

//获取签到信息
const signInfo = reactive({
	className: '',
	courseName: '',
	signEndTime: 0,
	signStartTime: 0,
	state: false
})
const getSignInfo = async () => {
	const res = await api.getSignList({ time: +dayjs() })
	if (res.statusCode === 200) {
		setReactive(signInfo, res.data)
	}
}
getSignInfo()

//倒计时
const residueTime = computed(() => useCountDown(signInfo.signEndTime))

//是否能签到
const isCanSign = computed(() => signInfo.signEndTime >= +dayjs())

// Taro.useDidShow(()=>{})
// websocket 接收老师发起签到信息
const socket = signInIO()
//签到开始
socket.on('onStartSign', () => {
	Taro.showToast({ title: '老师发起签到', icon: 'none', duration: 2000 })
	getSignInfo()
})
//签到结束
socket.on('onStopSign', () => {
	Taro.showToast({ title: '老师结束签到', icon: 'none', duration: 2000 })
	getSignInfo()
})
//清除websocket链接
Taro.useUnload(() => {
	socket.disconnect()
})
//获取 wifi 信息
const wifiInfo = useWifi()

//签到
const sginIn = async () => {
	if (wifiInfo.value) {
		const res = await api.signIn(wifiInfo.value.wifi.SSID)
		if (res.statusCode === 200) {
			getSignInfo()
		}
	}
}
</script>

<template>
	<div class="w-100vw min-h-100vh bg-white sgin-in">
		<empty v-if="signInfo.className === ''" :img="Svg.noCourse" text="老师暂未发起签到 您暂时无需签到"></empty>
		<empty v-else-if="!wifiInfo" type="noNetwork" text="请打开WIFI开关 , 连接教室网络进行签到"></empty>
		<div class="p-10px 	box-border" v-else>
			<div class="text-20px">{{ signInfo.className }} {{ signInfo.courseName }}</div>
			<div class="mt-10px color-gray-400 center justify-start">
				老师已发起签到 请在时间结束之前签到
			</div>
			<img :src="Svg.signIn" class="w-100% object-contain mt-80px mb-30px" alt="" />
			<div v-if="!isCanSign" class="center text-24px tracking-widest color-gray-4">签到已结束</div>
			<div class="center text-18px color-gray-5" v-else-if="!signInfo.state">
				<span>签到剩余时间</span>
				<span class="color-green px-10px box-border font-600 text-25px">
					{{ dayjs(residueTime.count).format('mm:ss') }}
				</span>
				<span>分钟</span>
			</div>
			<div class="center text-24px tracking-widest color-gray-4" v-if="signInfo.state">您已签到</div>
			<div :class="`${isCanSign ? 'button' : 'button-off'}  color-white text-20px font-600 tracking-widest`" @click="sginIn">{{ signInfo.state ? '您已签到' : '签到' }}</div>
		</div>
	</div>
</template>

<style lang="scss">
.sgin-in {
	.button {
		width: 80%;
		height: 100px;
		color: white;
		border-radius: 30px;
		background-color: #49b583;
		box-shadow: 0 20px 40px #49b5832a;
		margin: 200px auto;
		@include center;
	}
	.button:active {
		background-color: #3c946b;
	}
	.button-off {
		@extend .button;
		background-color: #ccc;
		box-shadow: none;
		pointer-events: none;
	}
}
</style>
