<script lang="ts" setup>
import card from './components/card.vue'
import { getRentListApi } from '@/api'
definePageConfig({
	navigationBarTitleText: '借用',
	navigationBarBackgroundColor: '#fafafa'
})
const addRent = () => {
	Taro.navigateTo({
		url: '/pages/rent-classroom/components/add-rent'
	})
}

const nowLit = ref<any[]>([])
const futureList = ref<any[]>([])
const historyList = ref<any[]>([])

const getRentList = async (type: string, length: number = 0) => {
	const param = {
		action: 1,
		indexStart: length,
		indexEnd: 10 + length,
		timeType: type,
		interfaceNum: '39-13'
	}
	const res = await getRentListApi(param)
	if (res.statusCode === 200) {
		console.log('[ res.data ] >', res.data)
		switch (type) {
			case 'now':
				res.data.list.forEach((item: any) => {
					nowLit.value.push(item)
				})
				break
			case 'future':
				res.data.list.forEach((item: any) => {
					futureList.value.push(item)
				})
				break
			case 'past':
				res.data.list.forEach((item: any) => {
					historyList.value.push(item)
				})
				break
		}
	}
}
getRentList('now')
getRentList('future')
getRentList('past')
const handleScroll = (e: any) => {
	const { scrollTop, clientHeight, scrollHeight } = e.target
	if (scrollTop + clientHeight === scrollHeight) {
		console.log('滚动到底部啦')
	}
}
const tabList1 = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
const current1 = ref(0)
const handleClick = (value) => {
	current1.value = value
}
</script>

<template>
	<div class="rent-classroom">
		<div class="addBtn" @click="addRent"><div class="i-ri-add-line  color-white text-25px"></div></div>
		<AtTabs :swipeable="false" :current="current1" :tabList="tabList1" @click="handleClick">
			<AtTabsPane :current="current1" :index="0">
				<view class="tab-content">标签页一的内容</view>
			</AtTabsPane>
			<AtTabsPane :current="current1" :index="1">
				<view class="tab-content">标签页二的内容</view>
			</AtTabsPane>
			<AtTabsPane :current="current1" :index="2">
				<view class="tab-content">标签页三的内容</view>
			</AtTabsPane>
		</AtTabs>
	</div>
</template>

<style lang="scss">
.rent-classroom {
	background-color: white;

	width: 100%;
	height: 100%;
	& > .addBtn {
		width: 100px;
		height: 100px;
		background-color: #49b583;
		position: fixed;
		top: 85vh;
		right: 5vw;
		z-index: 999;
		border-radius: 100%;
		@include center;
	}
}
</style>
