<script lang="ts" setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { reactive } from 'vue'
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
const state = reactive({
	tab1value: '0'
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
</script>

<template>
	<div class="rent-classroom">
		<div class="addBtn" @click="addRent"><nut-icon name="uploader"></nut-icon></div>
		<nut-tabs v-model="state.tab1value">
			<nut-tabpane title="当天进行" pane-key="0">
				<div class="card-box" @scroll="handleScroll">
					<card :item="item" v-for="item in nowLit"></card>
				</div>
			</nut-tabpane>
			<nut-tabpane title="未来进行" pane-key="1">
				<card :item="item" v-for="item in futureList"></card>
			</nut-tabpane>
		</nut-tabs>
		<!-- <nut-tabs v-model="state.tab1value">
			<nut-tabpane title="当天进行">
				<div class="card-box" @scroll="handleScroll">
					<card :item="item" v-for="item in nowLit"></card>
				</div>
			</nut-tabpane>
			<nut-tabpane title="未来进行">
				<card :item="item" v-for="item in futureList"></card>
			</nut-tabpane>
			<nut-tabpane title="历史进行">
				<card :item="item" v-for="item in historyList"></card>
			</nut-tabpane>
		</nut-tabs> -->
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
		border-radius: 100%;
		@include center;
		.nut-icon {
			font-size: 20px;
			color: white;
		}
	}
	& .nut-tabpane {
		height: calc(100vh - 46px);
		overflow: hidden;
		overflow-y: scroll;
		background-color: #fafafa;
	}
	& .nut-tabs__titles {
		background-color: #fafafa;
	}
}
</style>
