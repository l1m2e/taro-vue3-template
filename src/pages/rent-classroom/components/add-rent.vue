<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getFloorApi, getClassListApi, getCourseListApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import dayjs from 'dayjs'
definePageConfig({
	navigationBarTitleText: '申请借用',
	navigationBarBackgroundColor: '#fafafa'
})

const from = reactive({
	startTime: 0, // 开始时间戳
	endTime: 0, // 结束时间戳
	classPostion: '', // 楼层名称
	deviceName: '', //教室名称
	classMAC: '', //教室mac
	reason: '', //预约理由
	openBit: '' //开关
})

const dateDialog = ref(false) // 日期对话框是否显示
const floorDialog = ref(false) // 楼层选择器对话框是否显示
const classDialog = ref(false) // 教室选择器是否显示
const startTimeDialog = ref(false) // 开始时间选择器是否显示

const dateValue = ref() //日期对话框 选中的值
const floorList = ref() //楼层选择器数组
const classList = ref() //教室选择器数组
const startTimeList = ref() // 开始时间选择器数组

//日期选择触发
const selectDate = (e: Array<string>) => {
	dateValue.value = e[3]
}
//楼层选择触发
const selectFloor = ({ selectedValue }) => {
	from.classPostion = selectedValue[0]
	getClassList()
}
//教室选择触发
const selectClass = ({ selectedOptions }) => {
	from.deviceName = selectedOptions[0].ClassDeviceName
	from.classMAC = selectedOptions[0].ClassDeviceMac
	getCourseList()
}
//开始时间选择触发
const selectStartTime = ({ selectedValue }) => {
	from.startTime = selectedValue
}

//获取楼层列表 api --- start
const getFloorList = async () => {
	try {
		const res = await getFloorApi()
		if (res.statusCode === 200) {
			//格式化为选择器可以使用的数据结构
			res.data.list.forEach((item: any) => {
				item.text = item.ClassDevicePosition
				item.value = item.ClassDevicePosition
			})
			floorList.value = res.data.list
		}
	} catch (error) {
		console.log('[ error ] >', error)
	}
}
getFloorList()
//获取教室列表
const getClassList = async () => {
	const res = await getClassListApi(from.classPostion)
	if (res.statusCode === 200) {
		//格式化为选择器可以使用的数据结构
		res.data.list.forEach((item: any) => {
			item.text = item.ClassDeviceName
			item.value = item.ClassDeviceMac
		})
		classList.value = res.data.list
	}
}
//获取所有课程信息
const getCourseList = async () => {
	const param = {
		parameter: from.deviceName,
		time: dayjs(dateValue.value).format('YYYY-MM-DD')
	}
	const res = await getCourseListApi(param)
	if (res.statusCode === 200) {
		// 格式化出 选择器需要的字段
		res.data.today.forEach((item: any) => {
			item.text = `第${changeTextToCN(parseInt(item.CurIndex))}节`
			item.value = item.beginTime
		})
		// const deepCopyRes = JSON.parse(JSON.stringify(res.data.today)) //深拷贝一份数据
		startTimeList.value = res.data.today.filter((item: any) => item.CourseName === '') // 筛选没有课程的
	}
}
// api --- end
</script>

<template>
	<div class="add-rent">
		<!-- 日期选择器 -->
		<nut-calendar v-model:visible="dateDialog" :default-value="dateValue" @choose="selectDate"></nut-calendar>
		<!-- 楼层选择器 -->
		<nut-picker v-model:visible="floorDialog" :columns="floorList" title="楼层选择" @confirm="selectFloor"></nut-picker>
		<!-- 教室选择器 -->
		<nut-picker v-model:visible="classDialog" :columns="classList" title="教室选择" @confirm="selectClass"></nut-picker>
		<!-- 开始时间选择器 -->
		<nut-picker v-model:visible="startTimeDialog" :columns="startTimeList" title="选择开始时间" @confirm="selectStartTime"></nut-picker>
		<span>基本信息</span>
		<nut-form>
			<nut-form-item label="借用日期">
				<input class="nut-input-text" v-model="dateValue" @click="dateDialog = true" :disabled="true" placeholder="请选择地址" type="text" />
			</nut-form-item>
			<nut-form-item label="楼层">
				<input class="nut-input-text" v-model="from.classPostion" @click="floorDialog = true" :disabled="true" placeholder="请选择楼层" type="text" />
			</nut-form-item>
			<nut-form-item label="教室">
				<input class="nut-input-text" v-model="from.deviceName" @click="classDialog = true" :disabled="true" placeholder="请选择教室" type="text" />
			</nut-form-item>
			<nut-form-item label="开始时间">
				<input class="nut-input-text" v-model="from.startTime" @click="startTimeDialog = true" :disabled="true" placeholder="请选择时间" type="text" />
			</nut-form-item>
			<nut-form-item label="节次">
				<input class="nut-input-text" placeholder="请输入地址" type="text" />
			</nut-form-item>
			<nut-form-item label="理由">
				<nut-textarea placeholder="请输入备注" type="text" />
			</nut-form-item>
		</nut-form>
	</div>
</template>

<style lang="scss">
.add-rent {
	& > span {
		color: #9da7ae;
		margin-top: 30px;
		margin-left: 20px;
	}
}
</style>
