<script lang="ts" setup>
const props = defineProps<{
	state: string
	data: any
}>()

const titleClass = new Map()
titleClass.set('在进行', 'title-ongoing')
titleClass.set('已结束', 'title-past')
titleClass.set('未上课', 'title-future')
const titleColor = computed(() => titleClass.get(props.state))

const iconClass = new Map()
iconClass.set('在进行', 'icon-ongoing')
iconClass.set('已结束', 'icon-past')
iconClass.set('未上课', 'icon-future')
const iconColor = computed(() => iconClass.get(props.state))

const goToVideoView = (link: any) => {
	const res = link.find((item: any) => item.bsmodel === '电脑桌面')
	Taro.navigateTo({
		url: `/pages/course/components/video-view?link=${res.bspreSales}`
	})
}
const goToSign = () => {
	Taro.navigateTo({
		url: '/pages/sign-in/index'
	})
}
</script>

<template>
	<div class="course-card w-95% h-150px bg-white m-auto rounded-15px mt-10px overflow-hidden shadow-lg relative">
		<div :class="`w-100% h-40px  color-white px-10px box-border ${titleColor} flex `">
			<div v-if="data.state === '已结束'" class=" h-100%  flex items-center flex-1">
				<div class="i-ri-check-line w-22px h-22px"></div>
				<div class="ml-10px">{{ data.state }}</div>
			</div>
			<div v-if="data.state === '未上课'" class=" h-100% flex items-center flex-1">
				<div class="i-ri-time-line w-22px h-22px"></div>
				<div class="ml-10px">{{ data.state }}</div>
			</div>
			<div v-if="data.state === '在进行'" class=" h-100% flex items-center flex-1">
				<div class="i-ri-restart-line animate-spin w-22px h-22px"></div>
				<div class="ml-10px">{{ data.state }}</div>
			</div>
			<div class="center justify-end  flex-1 mr-20px">{{ data.courseName }}</div>
		</div>
		<div class="text-20px font-600 mt-10px ml-10px">{{ `${data.beginTime.slice(0, 5)} ~ ${data.endTime.slice(0, 5)}` }}</div>
		<div class="mt-5px center justify-start ml-10px">
			<div :class="`icon ${iconColor}`">
				<div class="i-ri-map-pin-line"></div>
			</div>
			{{ `${data.classDevicePosition} - ${data.classDeviceName}` }}
		</div>
		<div class="mt-5px center justify-start ml-10px">
			<div :class="`icon ${iconColor}`">
				<div class="i-ri-user-line"></div>
			</div>
			{{ data.teacherName }}
		</div>
		<div v-if="data.state === '在进行'">
			<div class="btn-info absolute right-20px top-60px " @click="goToVideoView(data.list)">观看</div>
			<div class="btn-info mt-10px absolute right-20px top-90px" @click="goToSign">签到</div>
		</div>
	</div>
</template>

<style lang="scss">
.course-card {
	// 标题颜色
	.title-ongoing {
		background-color: #7f86ff;
	}
	.title-past {
		background-color: #49b583;
	}
	.title-future {
		background-color: #ffbd69;
	}
	// 图标颜色
	.icon-ongoing {
		background-color: #7f86ff30;
		color: #7f86ff;
	}
	.icon-past {
		background-color: #49b58330;
		color: #49b583;
	}
	.icon-future {
		background-color: #ffbd6930;
		color: #ffbd69;
	}
	.icon {
		width: 55px;
		height: 55px;
		min-width: 55px;
		margin-right: 20px;
		border-radius: 10px;
		@include center;
	}
}
</style>
