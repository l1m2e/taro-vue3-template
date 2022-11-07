<script lang="ts" setup>
import dayjs from 'dayjs'

definePageConfig({
	navigationBarTitleText: '直播',
	navigationBarBackgroundColor: '#fafafa'
})

const liveList = ref<any[]>([])
const getLiveList = async () => {
	const res = await api.getClassLiveList(+dayjs())
	if (res.statusCode === 200) {
		liveList.value = res.data
		computeTime()
	}
}
getLiveList()

const today = dayjs().format('YYYY-MM-DD')
const computeTime = () => {
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
//进入页面启动定时器
const loopComputeTime = setInterval(() => {
	computeTime()
}, 1000)
//离开页面终止定时器
Taro.useUnload(() => {
	clearTimeout(loopComputeTime)
})
const goToVideoView = (link: any) => {
	const res = link.find((item: any) => item.bsmodel === '电脑桌面')
	Taro.navigateTo({
		url: `/pages/live/components/video-vi
		ew?link=${res.bspreSales}`
	})
}
</script>

<template>
	<div class="live">
		<div class="card" v-for="item in liveList">
			<div class="flex">
				<div class="flex-1">
					<div class="text-20px">{{ item.courseName }}</div>
					<div class="text-20px font-600 mt-5px">{{ `${item.beginTime.slice(0, 5)} ~ ${item.endTime.slice(0, 5)}` }}</div>
					<div class="mt-5px center justify-start">
						<div class="i-ri-map-pin-line"></div>
						教学楼1栋
					</div>
					<div class="mt-5px">
						<div class="i-ri-user-line"></div>
						老师100
					</div>
				</div>
				<div class="flex-1 center">
					<div v-if="item.state === '未上课'">未上课</div>
					<div v-if="item.state === '已结束'">已结束</div>
					<!-- <div v-if="item.state === '在进行'" class="btn-success" @click="goToVideoView(item.list)">观看</div> -->
					<div class="btn-success" @click="goToVideoView(item.list)">观看</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.live {
	padding: 10px;
	.card {
		width: 100%;
		background-color: white;
		height: 240px;
		margin: 20px auto;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
}
</style>
