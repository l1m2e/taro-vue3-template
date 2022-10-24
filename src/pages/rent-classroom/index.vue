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
getRentList('future')
getRentList('past')
// const handleScroll = (e: any) => {
// 	const { scrollTop, clientHeight, scrollHeight } = e.target
// 	if (scrollTop + clientHeight === scrollHeight) {
// 		console.log('滚动到底部啦')
// 	}
// }

const handleClick = (name: string) => {
	tabs.value = name
}
const tabs = ref('当天进行')

const lower = (type: string) => {
	switch (type) {
		case 'now':
			getRentList('now', nowLit.value.length)
			break
		case 'future':
			getRentList('future', futureList.value.length)
			break
		case 'past':
			console.log('[ c ] >')
			getRentList('past', historyList.value.length)
			break
	}
}
</script>

<template>
	<div class="rent-classroom">
		<div class="addBtn" @click="addRent"><div class="i-ri-add-line  color-white text-25px"></div></div>
		<Tabs :activate="tabs" @changeTab="handleClick">
			<TabPane name="当天进行" class="tab-content">
				<scroll-view :scroll-y="true" class="h-100%" :lowerThreshold="50" @scrolltolower="lower('now')">
					<card v-for="item in nowLit" :item="item"></card>
				</scroll-view>
			</TabPane>
			<TabPane name="未来进行" class="tab-content">
				<scroll-view :scroll-y="true" class="h-100%" :lowerThreshold="50" @scrolltolower="lower('future')">
					<card v-for="item in futureList" :item="item"></card>
				</scroll-view>
			</TabPane>
			<TabPane name="历史记录" class="tab-content">
				<scroll-view :scroll-y="true" class="h-100%" :lowerThreshold="50" @scrolltolower="lower('past')">
					<card v-for="item in historyList" :item="item"></card>
				</scroll-view>
			</TabPane>
		</Tabs>
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
	& .tab-content {
		height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		padding: 100px 20px 20px 20px;
	}
	& .tabs-title {
		position: fixed;
		top: 0;
		z-index: 99;
		background-color: white;
	}
}
</style>
