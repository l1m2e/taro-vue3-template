<script lang="ts" setup>
definePageConfig({
	navigationStyle: 'custom'
})

const selectArea = (e: any) => {
	const arr = e.detail.value
	//格式化对齐服务器格式
	params.School_Provinces = arr[0].replace(/省|市|自治区|特别行政区/g, '')
	if (['北京市', '上海市', '天津市', '重庆市'].includes(arr[1])) {
		params.School_City = '直辖市'
	} else {
		params.School_City = arr[1]
	}
	params.School_County = arr[2]
	schoolList.value.length = 0
	//发送筛选请求
	getSchollList()
}

// 清空筛选
const removalFilter = () => {
	schoolList.value.length = 0
	params.School_Provinces = ''
	params.School_City = ''
	params.School_County = ''
	getSchollList()
}

// 学校列表
const schoolList: any = ref([])
const params = {
	School_Provinces: '', //省份
	School_City: '', // 城市
	School_County: '', //区
	Verify: '1', //是否被显示
	OnLineStatus: '', // 在线状况
	School_IP: '', // 学校ip
	firstIndex: '', // 开始序号
	lastIndex: 8 // 结束序号
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
	sid: ''
})
const chooseSchools = (item: any) => {
	schoolInfo.value = item
}
</script>

<template>
	<div class="bindScholl">
		<div class="card center flex-col p-10px">
			<div class="flex justify-between w-100%">
				<p class=" text-16px">请选择您所在的学校</p>
				<div center>
					<picker mode="region" class="btn-success p-5px" @change="selectArea">筛选</picker>
					<div class="i-ri-close-line color-green" @click="removalFilter" v-if="params.School_Provinces"></div>
				</div>
			</div>
			<div class="h-400px mt-10px w-100%">
				<scroll-view scroll-y="true" :lowerThreshold="50" @scrolltolower="lower" class="h-100% w-100%">
					<div :class="`w-100% h-50px leading-50px mt-10px text-center ${schoolInfo.sid === item.sid ? '.activate' : ''}`" v-for="item in schoolList" @click="chooseSchools(item)">
						{{ item.School_Name }}
					</div>
				</scroll-view>
			</div>
		</div>
		<div class="btn-success mt-10px">选择学校</div>
	</div>
</template>
<style lang="scss">
.bindScholl {
	@include center;
	flex-direction: column;
	height: 100vh;
	background-image: linear-gradient(135deg, #69ff97 10%, #00e4ff 100%);
	background-position: center;
	.card {
		width: 85vw;
		backdrop-filter: blur(16px) saturate(180%);
		-webkit-backdrop-filter: blur(16px) saturate(180%);
		background-color: rgba(255, 255, 255, 0.75);
		border-radius: 12px;
		border: 1px solid rgba(209, 213, 219, 0.3);
	}
	.activate {
		background-color: aquamarine;
		border-radius: 30px;
	}
}
</style>
