<script lang="ts" setup>
import card from './components/card.vue'
import { getRentListApi } from '@/api'
import Tabs from '@/components/base/tabs/index.vue'
import TabPane from '@/components/base/tab-pane/index.vue'
definePageConfig({
	navigationBarTitleText: '借用'
	// navigationBarBackgroundColor: '#fafafa'
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

const handleClick = (name: string) => {
	tabs.value = name
	switch (name) {
		case '当天进行':
			if (nowLit.value.length === 0) {
				getRentList('now')
			}
			break
		case '未来进行':
			if (futureList.value.length === 0) {
				getRentList('future')
			}
			break
		case '历史记录':
			if (historyList.value.length === 0) {
				getRentList('past')
			}
			break
		default:
			break
	}
}
const tabs = ref('当天进行')

// 监听下滑到底部
const lower = (type: string) => {
	console.log('[ type ] >', type)
	switch (type) {
		case 'now':
			getRentList('now', nowLit.value.length)
			break
		case 'future':
			getRentList('future', futureList.value.length)
			break
		case 'past':
			getRentList('past', historyList.value.length)
			break
	}
}
</script>

<template>
	<div class="rent-classroom">
		<!-- 添加按钮 -->
		<div class="addBtn" @click="addRent"><div class="i-ri-add-line  color-white text-25px"></div></div>
		<!-- tabs -->
		<Tabs :activate="tabs" @changeTab="handleClick">
			<TabPane name="当天进行" class="tab-content" @buttomLoad="lower('now')">
				<card v-for="item in nowLit" :item="item" class="card"></card>
			</TabPane>
			<TabPane name="未来进行" class="tab-content" @buttomLoad="lower('future')">
				<card v-for="item in futureList" :item="item" class="card"></card>
			</TabPane>
			<TabPane name="历史记录" class="tab-content" @buttomLoad="lower('future')">
				<card v-for="item in historyList" :item="item" class="card"></card>
			</TabPane>
		</Tabs>
	</div>
</template>

<style lang="scss">
.rent-classroom {
	background-color: white;
	width: 100%;
	height: 100%;
	position: relative;
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
	& .tab-content {
		height: calc(100vh - 60px);
		box-sizing: border-box;
		padding-top: 120px;
		@include center;
		.card {
			width: 90%;
		}
	}
	& .tabs-title {
		position: fixed;
		top: 0;
		z-index: 99;
		background-color: white;
	}
}
</style>
