<script lang="ts" setup>
import dayjs from 'dayjs'
import { useCheckSchoolBind } from '@/composables'
import empty from '@/components/empty-page/index.vue'
definePageConfig({
	navigationBarTitleText: '课程',
	navigationBarBackgroundColor: '#fafafa'
})

Taro.useDidShow(() => {
	getLiveList()
	useCheckSchoolBind()
})

const liveList = ref<any[]>([])
const getLiveList = async () => {
	const res = await api.getClassLiveList(+dayjs())
	if (res.statusCode === 200) {
		liveList.value = res.data
		computeTime()
	}
}

//进入页面启动定时器
const loopComputeTime = setInterval(() => {
	computeTime()
}, 1000)
//离开页面终止定时器
Taro.useUnload(() => {
	clearTimeout(loopComputeTime)
})

const today = dayjs().format('YYYY-MM-DD')
function computeTime() {
	liveList.value.forEach((item: any) => {
		let startTime = +dayjs(`${today} ${item.beginTime.slice(0, 5)}`)
		let endTime = +dayjs(`${today} ${item.endTime.slice(0, 5)}`)
		if (+dayjs() > endTime) {
			item.state = '已结束'
		} else {
			if (+dayjs() >= startTime) {
				item.state = '在进行'
			} else {
				item.state = '未上课'
			}
		}
	})
}

const goToVideoView = (link: any) => {
	const res = link.find((item: any) => item.bsmodel === '电脑桌面')
	Taro.navigateTo({
		url: `/pages/live/components/video-view?link=${res.bspreSales}`
	})
}
const goToSign = () => {
	Taro.navigateTo({
		url: '/pages/sign-in/index'
	})
}
</script>

<template>
	<div class="live">
		<div class="card" v-for="item in liveList" v-if="liveList.length">
			<div class="flex">
				<div class="flex-1">
					<div class="title">{{ item.courseName }}</div>
					<div class="text-20px font-600 mt-42px">{{ `${item.beginTime.slice(0, 5)} ~ ${item.endTime.slice(0, 5)}` }}</div>
					<div class="mt-5px center justify-start">
						<div class="icon">
							<div class="i-ri-map-pin-line"></div>
						</div>
						{{ `${item.classDevicePosition} - ${item.classDeviceName}` }}
					</div>
					<div class="mt-5px center justify-start">
						<div class="icon">
							<div class="i-ri-user-line"></div>
						</div>
						{{ item.teacherName }}
					</div>
				</div>
				<div class="flex-1 center">
					<div v-if="item.state === '未上课'" class="text-20px">未上课</div>
					<div v-if="item.state === '已结束'" class="text-20px color-gray">已结束</div>
					<div v-if="item.state === '在进行'" class="center flex-col w-100% h-100%">
						<div class="btn-success" @click="goToVideoView(item.list)">观看</div>
						<div class="btn-success mt-10px" @click="goToSign">签到</div>
					</div>
				</div>
			</div>
		</div>
		<empty v-else></empty>
	</div>
</template>

<style lang="scss">
.live {
	padding: 20px;
	.card {
		width: 100%;
		background-color: white;
		height: 280px;
		margin: 20px auto;
		box-sizing: border-box;
		padding: 10px;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		position: relative;
		.title {
			padding-left: 10px;
			position: absolute;
			top: 18px;
			left: 0px;
			width: 340px;
			height: 60px;
			line-height: 60px;
			text-align: center;
			color: #18a058;
			background: rgba(24, 160, 88, 0.16);
			border-radius: 0px 20px 20px 0px;
			@include ellipsis-overflow;
		}
	}
	.icon {
		width: 55px;
		height: 55px;
		min-width: 55px;
		background-color: #49b58330;
		margin-right: 20px;
		border-radius: 10px;
		@include center;
		color: #49b583;
	}
}
</style>
