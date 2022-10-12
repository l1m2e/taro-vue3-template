<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getFloorApi, getClassListApi, getCourseListApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import dayjs from 'dayjs'
definePageConfig({
	navigationBarTitleText: '申请借用'
	// navigationBarBackgroundColor: '#fafafa'
})

const from = reactive({
	startTime: '', // 开始时间戳
	endTime: '', // 结束时间戳
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
const sectionDialog = ref(false) //节次选择器是否显示

const dateValue = ref() //日期对话框 选中的值
const floorList = ref<any[]>([]) //楼层选择器数组
const classList = ref<any[]>([]) //教室选择器数组
const startTimeList = ref<any[]>([]) // 开始时间选择器数组
const sectionList = ref<any[]>([]) //节次选择器数组

//日期选择触发
const selectDate = (e: Array<string>) => {
	dateValue.value = e[3]
	//清空操作
	from.startTime = ''
	from.endTime = ''
	from.deviceName = ''
	from.classMAC = ''
	startTimeList.value.length = 0
	sectionList.value.length = 0
	getFloorList()
}
//楼层选择触发
const selectFloor = ({ selectedValue }) => {
	from.classPostion = selectedValue[0]
	//清空操作
	from.deviceName = ''
	from.startTime = ''
	from.endTime = ''
	classList.value.length = 0
	startTimeList.value.length = 0
	sectionList.value.length = 0
	getClassList()
}
//教室选择触发
const selectClass = ({ selectedOptions }) => {
	from.startTime = ''
	from.endTime = ''
	from.deviceName = selectedOptions[0].ClassDeviceName
	from.classMAC = selectedOptions[0].ClassDeviceMac
	getCourseList()
}
//开始时间选择触发
const selectStartTime = ({ selectedOptions }) => {
	from.endTime = ''
	from.startTime = selectedOptions[0].beginTime
	sectionList.value = screenSection(selectedOptions[0].CurIndex)
}
//选择结束时间触发 节次
const selectEndTime = ({ selectedOptions }) => {
	from.endTime = selectedOptions[0].endTime
}

const courseListList = ref() //所有课程信息数组
//筛选课程信息
const screenSection = (id: string) => {
	//先筛掉被选中时间段之前的课程
	const tempArr: Array<any> = courseListList.value.filter((item: any) => parseInt(item.CurIndex) >= parseInt(id))
	const index = tempArr.findIndex((item: any) => item.CourseName !== '')
	if (index === -1) {
		//如果找不到 那么就都是没问题的全部一起返回
		return tempArr
	}
	return tempArr.slice(0, index)
}

//获取楼层列表 api --- start
const getFloorList = async () => {
	const res = await getFloorApi()
	if (res.statusCode === 200) {
		//格式化为选择器可以使用的数据结构
		res.data.list.forEach((item: any) => {
			item.text = item.ClassDevicePosition
			item.value = item.ClassDevicePosition
		})
		floorList.value = res.data.list
	}
}

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
			item.text = `第${changeTextToCN(parseInt(item.CurIndex) + 1)}节`
			item.value = item.beginTime
		})
		courseListList.value = res.data.today
		startTimeList.value = res.data.today.filter((item: any) => item.CourseName === '') // 筛选没有课程的
	}
}
// api --- end
const checkboxArr = ref([false, false, false, false, false, false])
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
		<!-- 节次选择器/结束时间选择器 -->
		<nut-picker v-model:visible="sectionDialog" :columns="sectionList" title="选择节次" @confirm="selectEndTime"></nut-picker>
		<span>基本信息</span>
		<nut-form>
			<nut-form-item label="借用日期">
				<input class="nut-input-text" v-model="dateValue" @click="dateDialog = true" :disabled="true" placeholder="请选择日期" type="text" />
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
				<input class="nut-input-text" v-model="from.endTime" @click="sectionDialog = true" :disabled="true" placeholder="请选择节次" type="text" />
			</nut-form-item>
			<nut-form-item label="理由">
				<nut-textarea placeholder="请填写申请理由" v-model="from.reason" type="text" />
			</nut-form-item>
			<nut-form-item label="复选框">
				<nut-checkbox v-model="checkboxArr[0]">复选框</nut-checkbox>
				<nut-checkbox v-model="checkboxArr[1]">复选框</nut-checkbox>
				<nut-checkbox v-model="checkboxArr[2]">复选框</nut-checkbox>
				<nut-checkbox v-model="checkboxArr[3]">复选框</nut-checkbox>
				<nut-checkbox v-model="checkboxArr[4]">复选框</nut-checkbox>
			</nut-form-item>
			<nut-cell>
				<nut-button type="primary" style="margin-right: 10px" size="small">提交</nut-button>
				<nut-button size="small">重置表单</nut-button>
			</nut-cell>
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
