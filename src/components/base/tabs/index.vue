<script lang="ts" setup>
const props = defineProps<{
	activate: string
}>()

const slots = useSlots()

const tag = computed(() => {
	if (!slots.default) return []
	const arr = slots.default().map((item) => item.props?.name)
	return arr.filter((item) => item)
})

const renderContent = () => {
	return (
		slots.default &&
		slots.default().find((item) => {
			if (props.activate === '') {
				return true
			}
			return item.props?.name === props.activate
		})
	)
}

// 点击改变
const emit = defineEmits(['changeTab'])
const changeTab = (name: string) => {
	emit('changeTab', name)
}

// 滑动开始
let pageXStart = 0
let pageYStart = 0
const touchstart = (e: any) => {
	pageXStart = e.changedTouches[0].pageX
	pageYStart = e.changedTouches[0].pageY
}
//滑动结束
const touchend = (e: any) => {
	//滑动减去结束滑动的像素
	let difference = pageXStart - e.changedTouches[0].pageX
	let isPullDown = pageYStart - e.changedTouches[0].pageY
	if (isPullDown <= -100 || isPullDown >= 100) return // 监测如果是下滑操作取消切换页面
	if (difference <= -50) {
		emit('changeTab', touchChange('add'))
	}
	if (difference >= 50) {
		emit('changeTab', touchChange('reduce'))
	}
}

const touchChange = (type: string) => {
	if (!slots.default) return
	const arr = slots
		.default()
		.map((item) => item.props?.name)
		.filter((item) => item)
	const index = arr.findIndex((item) => item === props.activate)
	if (type === 'add') {
		return arr[index - 1] ? arr[index - 1] : arr[arr.length - 1]
	} else {
		return arr[index + 1] ? arr[index + 1] : arr[0]
	}
}
</script>

<template>
	<div class="tabs">
		<div class="tabs-title">
			<div v-for="item in tag" @click="changeTab(item)" :class="`tabs-title-item ${item === props.activate ? '.tabs-title-item-activate ' : ''}`">{{ item }}</div>
		</div>
		<div class="tabs-content" @touchstart="touchstart" @touchend="touchend">
			<renderContent />
			<!-- <slot></slot> -->
		</div>
	</div>
</template>

<style lang="scss">
.tabs {
	.tabs-title {
		height: 100px;
		width: 100%;
		display: flex;
		.tabs-title-item {
			flex: 1;
			text-align: center;
			line-height: 100px;
			position: relative;
			top: 0;
			height: 100%;
			box-sizing: border-box;
			border-color: white;
		}
	}
	.tabs-title-item::after {
		content: '';
		width: 0;
		height: 4px;
		background: #48b583;
		position: absolute;
		bottom: 0px;
		left: 50%;
		transition: all 0.5s;
	}
	.tabs-title-item-activate::after {
		left: 0;
		width: 100%;
	}
}
</style>
