<script lang="ts" setup>
import { useConfirmSchool } from '@/composables'
import { setReactive } from '@/utils/setReactive'
import Mask from '@/components/mask/index.vue'
definePageConfig({
	navigationStyle: 'custom'
})

// Taro.getLocation({
// 	type: 'wgs84',
// 	success: function(res) {
// 		const latitude = res.latitude
// 		const longitude = res.longitude
// 	}
// })

const selectArea = (e: any) => {
	const arr = e.detail.value
	//格式化对齐服务器格式
	params.school_Provinces = arr[0].replace(/省|市|自治区|特别行政区/g, '')
	if (['北京市', '上海市', '天津市', '重庆市'].includes(arr[1])) {
		params.school_City = '直辖市'
	} else {
		params.school_City = arr[1]
	}
	params.school_County = arr[2]
	schoolList.value.length = 0
	//发送筛选请求
	getSchollList()
}

// 清空筛选
const removalFilter = () => {
	schoolList.value.length = 0
	params.school_Provinces = ''
	params.school_City = ''
	params.school_County = ''
	getSchollList()
}

// 学校列表
const schoolList = ref<any[]>([])
const params = {
	school_Provinces: '', //省份
	school_City: '', // 城市
	school_County: '', //区
	verify: '1', //是否被显示
	onLineStatus: '', // 在线状况
	school_IP: '', // 学校ip
	firstIndex: '', // 开始序号
	lastIndex: 8, // 结束序号
	school_Name: ''
}
const getSchollList = async () => {
	const res = await api.getSchoolList({ ...params, firstIndex: schoolList.value.length })
	if (res.statusCode === 200 && res.data.resultCode === '0') {
		// 如果拿到重复的证明到最后的数据了直接跳出函数
		if (schoolList.value.pop()?.sid === res.data.resultBody.pop()?.sid) return
		schoolList.value = schoolList.value.concat(res.data.resultBody)
	}
}
getSchollList()

// 滑动到底部触发
const lower = () => {
	getSchollList()
}

// 选择学校
const schoolInfo = ref({
	sid: '',
	school_Name: '',
	innerURL: '',
	outURL: '',
	mac: ''
})
const chooseSchools = (item: any) => {
	setReactive(schoolInfo.value, item)
}
</script>

<template>
	<div class="bindScholl">
		<Mask :show="schoolList.length === 0"></Mask>
		<div class="card center flex-col p-10px">
			<div class="flex justify-between w-100%">
				<p class=" text-16px">请选择您所在的学校</p>
				<div class="center">
					<picker mode="region" class="btn-success p-5px px-30px" v-if="!params.school_Provinces" @change="selectArea">筛选</picker>
					<div class="btn-success p-5px px-10px ml-30px" @click="removalFilter" v-if="params.school_Provinces">清除筛选</div>
				</div>
			</div>
			<div class="h-400px mt-10px w-100%">
				<scroll-view scroll-y="true" :lowerThreshold="50" @scrolltolower="lower" class="h-100% w-100%">
					<div :class="`w-100% h-50px leading-50px mt-10px text-center ${schoolInfo.sid === item.sid ? '.activate' : ''}`" v-for="item in schoolList" @click="chooseSchools(item)">
						{{ item.school_Name }}
					</div>
				</scroll-view>
			</div>
		</div>
		<div class="btn-success w-80vw h-30px center mt-10px" @click="useConfirmSchool(schoolInfo)">选择学校</div>
	</div>
</template>
<style lang="scss">
.bindScholl {
	@include center;
	flex-direction: column;
	height: 100vh;
	background-image: url(https://www.lta-yun.com/school.jpg);
	background-size: cover;
	.card {
		width: 85vw;
		backdrop-filter: blur(16px) saturate(180%);
		-webkit-backdrop-filter: blur(16px) saturate(180%);
		background-color: rgba(255, 255, 255, 0.75);
		border-radius: 12px;
		border: 1px solid rgba(209, 213, 219, 0.3);
	}
	.activate {
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 30px;
	}
}
</style>
