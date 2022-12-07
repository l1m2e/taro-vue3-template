<script lang="ts" setup>
import card from './components/card.vue'
import { getRentListApi } from '@/api'
import Tabs from '@/components/base/tabs/index.vue'
import TabPane from '@/components/base/tab-pane/index.vue'
import empty from '@/components/empty-page/index.vue'
import { useToken } from '@/composables'
definePageConfig({
	navigationBarTitleText: '借用',
	navigationBarBackgroundColor: '#fafafa',
	usingComponents: {}
})
const addRent = () => {
	Taro.navigateTo({
		url: '/pages/rent-classroom/components/add-rent'
	})
}
Taro.useDidShow(() => {
	onTypeQueryList()
})
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

const tabs = ref('当天进行')
const handleClick = (name: string) => {
	tabs.value = name
	onTypeQueryList()
}
const onTypeQueryList = () => {
	switch (tabs.value) {
		case '当天进行':
			nowLit.value.length = 0
			getRentList('now')
			break
		case '未来进行':
			futureList.value.length = 0
			getRentList('future')
			break
		case '历史记录':
			historyList.value.length = 0
			getRentList('past')
			break
	}
}

// 监听下滑到底部
const lower = (type: string) => {
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
		<div v-if="useToken">
			<!-- 添加按钮 -->
			<div class="addBtn" @click="addRent"><div class="i-ri-add-line  color-white text-25px"></div></div>
			<!-- tabs -->
			<Tabs v-model:activate="tabs" @changeTab="handleClick">
				<TabPane name="当天进行" class="tab-content" @buttomLoad="lower('now')">
					<card v-for="item in nowLit" :item="item" class="card" v-if="nowLit.length !== 0"></card>
					<empty v-else></empty>
				</TabPane>
				<TabPane name="未来进行" class="tab-content" @buttomLoad="lower('future')">
					<card v-for="item in futureList" :item="item" class="card" v-if="futureList.length !== 0"></card>
					<empty v-else></empty>
				</TabPane>
				<TabPane name="历史记录" class="tab-content" @buttomLoad="lower('future')">
					<card v-for="item in historyList" :item="item" class="card" v-if="historyList.length !== 0"></card>
					<empty v-else></empty>
				</TabPane>
			</Tabs>
		</div>
		<empty v-else type="noLogin"></empty>
	</div>
</template>

<style lang="scss">
.rent-classroom {
	width: 100%;
	height: 100%;
	position: relative;
	.addBtn {
		width: 100px;
		height: 100px;
		background-color: #49b583;
		position: fixed;
		right: 5vw;
		bottom: 120px;
		z-index: 999;
		border-radius: 100%;
		@include center;
	}
	.tab-content {
		padding-top: 120px;
		padding-bottom: 150px;
		@include center;
		.card {
			width: 90%;
		}
	}
	.tabs-title {
		position: fixed;
		top: 0;
		z-index: 99;
		// background-color: white;
	}
}
</style>
