<script lang="ts" setup>
const props = defineProps<{
	state: string
	data: any
}>()

const titleClass = new Map()
titleClass.set('在进行', 'title-ongoing')
titleClass.set('已结束', 'title-past')
titleClass.set('未上课', 'title-future')
titleClass.set('待进行', 'title-wait')
const titleColor = computed(() => titleClass.get(props.state))

const iconClass = new Map()
iconClass.set('在进行', 'icon-ongoing')
iconClass.set('已结束', 'icon-past')
iconClass.set('未上课', 'icon-future')
iconClass.set('待进行', 'icon-wait')
const iconColor = computed(() => iconClass.get(props.state))

const goToVideoView = (link: any) => {
	if (link.length !== 0) {
		const res = link.find((item: any) => item.bsmodel === '电脑桌面')
		if (res) return Taro.navigateTo({ url: `/pages/course/components/video-view?link=${res.bspreSales}` })
		Taro.showToast({ title: '无流地址', icon: 'error', duration: 2000 })
	} else {
		Taro.showToast({ title: '无直播地址', icon: 'error', duration: 2000 })
	}
}
console.log(props.data)
const goToSign = () => {
	Taro.navigateTo({
		url: `/pages/sign-in/index?id=${props.data.sid}`
	})
}
</script>

<template>
	<div class="course-card w-95% h-auto bg-white m-auto rounded-15px mt-10px overflow-hidden shadow-lg relative">
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
			<div v-if="data.state === '待进行'" class=" h-100% flex items-center flex-1">
				<div class="i-ri-time-line w-22px h-22px"></div>
				<div class="ml-10px">{{ data.state }}</div>
			</div>
			<div class="center justify-end  flex-1 mr-20px">{{ data.courseName }}</div>
		</div>
		<div class="w-100% h-100% box-border p-10px">
			<div class="text-20px font-600 ">{{ `${data.beginTime.slice(0, 5)} ~ ${data.endTime.slice(0, 5)}` }}</div>
			<div class="mt-5px center justify-start">
				<div :class="`icon ${iconColor}`"><div class="i-ri-map-pin-line"></div></div>
				<div v-if="data.newPos">
					<div class="line-through color-gray ">{{ data.classDevicePosition }} - {{ data.classDeviceName }}</div>
					<br />
					<div>{{ data.newPos }} - {{ data.newName }}</div>
				</div>
				<div v-else>
					<div>{{ data.classDevicePosition }} - {{ data.classDeviceName }}</div>
				</div>
			</div>
			<div class="mt-5px center justify-start ">
				<div :class="`icon ${iconColor}`">
					<div class="i-ri-user-line"></div>
				</div>
				{{ data.teacherName }}
			</div>
		</div>

		<div v-if="data.state === '在进行' || data.state === '待进行'">
			<div class="btn-info absolute right-20px top-60px " @click="goToVideoView(data.list)" v-if="data.haveClass === 'FF'">观看</div>
			<div class="btn-info mt-10px absolute right-20px top-90px" @click="goToSign">签到</div>
		</div>
	</div>
</template>

<style lang="scss">
.course-card {
	// 标题颜色
	.title-ongoing {
		background-color: var(--color-primary1);
	}
	.title-past {
		background-color: var(--color-primary2);
	}
	.title-future {
		background-color: var(--color-primary3);
	}
	.title-wait {
		background-color: var(--color-primary4);
	}
	// 图标颜色
	.icon-ongoing {
		background-color: var(--color-shadow1);
		color: var(--color-primary1);
	}
	.icon-past {
		background-color: var(--color-shadow2);
		color: var(--color-primary2);
	}
	.icon-future {
		background-color: var(--color-shadow3);
		color: var(--color-primary3);
	}
	.icon-wait {
		background-color: var(--color-shadow4);
		color: var(--color-primary4);
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
