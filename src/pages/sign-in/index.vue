<script lang="ts" setup>
import dayjs from 'dayjs'
import empty from '@/components/empty-page/index.vue'
import { useWifi, useCountDown } from '@/composables'
import { noCourseSvg } from '@/utils/image'
import { setReactive } from '@/utils/setReactive'

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
		console.log('[ res.data ] >', res.data)
	}
}
getSignInfo()
const residueTime = computed(() => useCountDown(signInfo.signEndTime))

//获取 wifi 信息
const wifiInfo = useWifi()
console.log('[ wifiInfo ] >', wifiInfo.value)

//签到
const sginIn = async () => {
	if (wifiInfo.value) {
		const res = await api.signIn(wifiInfo.value.wifi.SSID)
		if (res.statusCode === 200) {
			Taro.showModal({ title: '签到成功' })
		}
	}
}
</script>

<template>
	<div class="w-100vw min-h-100vh bg-white sgin-in">
		<empty v-if="signInfo.className === ''" :img="noCourseSvg" text="当前暂无课程 您无需签到"></empty>
		<!-- <empty v-else-if="signInfo.length !== 0 && !wifiInfo" type="noNetwork" text="请打开WIFI开关 , 连接教室网络进行签到"></empty> -->
		<div class="p-10px 	box-border" v-else>
			<div class="text-20px">{{ signInfo.className }} {{ signInfo.courseName }}</div>
			<div class="mt-10px color-gray-400 center justify-start">
				老师已发起签到 请在时间结束之前签到
			</div>
			<img :src="noCourseSvg" class="w-100% object-contain mt-80px mb-30px" alt="" />
			<div class="center text-18px color-gray-5">
				<span>签到剩余时间</span>
				<span class="color-green px-10px box-border font-600 text-25px">{{ dayjs(residueTime.count).format('mm:ss') }}</span>
				<span>分钟</span>
			</div>
			<div class="button color-white text-20px font-600 tracking-widest " @click="sginIn">签到</div>
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
}
</style>
