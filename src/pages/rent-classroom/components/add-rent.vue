<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { getFloorApi, getClassListApi, getCourseListApi, addRentClassroomApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import dayjs from 'dayjs'
definePageConfig({
	navigationBarTitleText: '申请借用',
	navigationBarBackgroundColor: '#fafafa'
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

const dateValue = ref() //日期对话框 选中的值
const floorList = ref<any[]>([]) //楼层选择器数组
const classList = ref<any[]>([]) //教室选择器数组
const startTimeList = ref<any[]>([]) // 开始时间选择器数组
const endTimeList = ref<any[]>([]) // 时间结束选择器数组

const courseListList = ref() //所有课程信息数组

// api --- end
const switchList = ref([
	{ switch: false, name: '系统权限' },
	{ switch: false, name: '灯光权限' },
	{ switch: false, name: '空调权限' },
	{ switch: false, name: '窗帘权限' },
	{ switch: false, name: '风扇权限' }
])

const submit = async () => {
	// if (dateValue.value !== '' || from.deviceName !== '' || from.classPostion !== '' || from.reason !== '') {
	// 	return console.log('[ 请将参数填写完整 ] >')
	// }
	const startTime = +dayjs(`${dateValue.value} ${from.startTime}`)
	const endTime = +dayjs(`${dateValue.value} ${from.endTime}`)
	const openBit: Array<number> = []
	switchList.value.forEach((item: any) => {
		if (item.switch) {
			openBit.push(1)
		} else {
			openBit.push(0)
		}
	})
	from.openBit = openBit.toString().replace(/,/g, '')

	const res = await addRentClassroomApi({ ...from, startTime, endTime })
	if (res.statusCode == 200) {
		console.log('[ 添加成功 ] >')
	}
}

//选择日期触发
const dateChange = (e: any) => {
	dateValue.value = e.detail.value
	cleanFrom()
	getFloorList()
}

//选择楼层触发
const floorChange = (e: any) => {
	cleanFrom('class')
	from.classPostion = floorList.value[parseInt(e.detail.value)].ClassDevicePosition
	getClassList()
}

//教室选择触发
const classRoomChange = (e: any) => {
	cleanFrom('class')
	from.deviceName = classList.value[parseInt(e.detail.value)].ClassDeviceName
	from.classMAC = classList.value[parseInt(e.detail.value)].ClassDeviceMac
	getCourseList()
}

// 选择开始时间
const startTimeChange = (e: any) => {
	cleanFrom('startTime')
	from.startTime = startTimeList.value[parseInt(e.detail.value)].beginTime
	endTimeList.value = screenSection(startTimeList.value[parseInt(e.detail.value)].CurIndex)
	console.log('[ selectedOptions[0].CurIndex) ] >', startTimeList.value[parseInt(e.detail.value)].CurIndex)
}

// 选择结束时间
const endTimeChange = (e: any) => {
	from.endTime = startTimeList.value[parseInt(e.detail.value)].endTime
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

//筛选课程信息
const screenSection = (id: string) => {
	//先筛掉被选中时间段之前的课程
	const tempArr: Array<any> = courseListList.value.filter((item: any) => parseInt(item.CurIndex) >= parseInt(id))
	console.log('%c [ tempArr ]-90', 'font-size:13px; background:pink; color:#bf2c9f;', tempArr)
	const index = tempArr.findIndex((item: any) => item.CourseName !== '')
	if (index === -1) {
		//如果找不到 那么就都是没问题的全部一起返回
		return tempArr
	}
	console.log('[ tempArr.slice(0, index) ] >', tempArr.slice(0, index))
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

//清楚表单函数
const cleanFrom = (type: string = 'all') => {
	switch (type) {
		case 'all':
			from.deviceName = '' // 清空教室名称
			from.startTime = '' //清空开始时间表单
			from.endTime = '' // 清空结束时间表单
			classList.value.length = 0 // 清空教室选择器数组
			startTimeList.value.length = 0 // 清空开始时间选择器数组
			endTimeList.value.length = 0 //清空结束时间选择器数组
			break
		case 'class':
			from.startTime = ''
			from.endTime = ''
			break
		case 'startTime':
			from.endTime = ''
			endTimeList.value.length = 0
			break
	}
}
</script>

<template>
	<div class="add-rent">
		<div class="cell">
			<span>借用日期</span>
			<picker mode="date" fields="day" @change="dateChange" :start="dayjs().format('YYYY-MM-DD')">
				<div class="text-gray">{{ dateValue ? dateValue : '请选择' }}</div>
			</picker>
		</div>
		<div class="cell">
			<span>选择楼层</span>
			<picker mode="selector" :range="floorList" range-key="ClassDevicePosition" @change="floorChange">
				<div class="text-gray">{{ from.classPostion ? from.classPostion : '请选择' }}</div>
			</picker>
		</div>
		<div class="cell">
			<span>选择教室</span>
			<picker mode="selector" :range="classList" range-key="ClassDeviceName" @change="classRoomChange">
				<div class="text-gray">{{ from.deviceName ? from.deviceName : '请选择' }}</div>
			</picker>
		</div>
		<div class="cell">
			<span>选择开始时间</span>
			<picker mode="selector" :range="startTimeList" range-key="text" @change="startTimeChange">
				<div class="text-gray">{{ from.startTime ? from.startTime : '请选择' }}</div>
			</picker>
		</div>
		<div class="cell">
			<span>选择结束时间</span>
			<picker mode="selector" :range="endTimeList" range-key="text" @change="endTimeChange">
				<div class="text-gray">{{ from.endTime ? from.endTime : '请选择' }}</div>
			</picker>
		</div>
		<div>功能</div>
		<div class="bg-white p-10px box-border">
			<textarea class="border-1 border-gray100 rounded-md w-100% p-10px box-border focus-within-border-emerald " auto-height placeholder="请输入申请理由" />
			<div class="btn  mt-10px">提交</div>
		</div>
		<!-- 日期选择器 -->
		<!-- <nut-calendar v-model:visible="dateDialog" :default-value="dateValue" @choose="selectDate"></nut-calendar> -->
		<!-- 楼层选择器 -->
		<!-- <nut-picker v-model:visible="floorDialog" :columns="floorList" title="楼层选择" @confirm="selectFloor" :three-dimensional="false"></nut-picker> -->
		<!-- 教室选择器 -->
		<!-- <nut-picker v-model:visible="classDialog" :columns="classList" title="教室选择" @confirm="selectClass" :three-dimensional="false"></nut-picker> -->
		<!-- 开始时间选择器 -->
		<!-- <nut-picker v-model:visible="startTimeDialog" :columns="startTimeList" title="选择开始时间" @confirm="selectStartTime" :three-dimensional="false"></nut-picker> -->
		<!--  选择器/结束时间选择器 -->
		<!-- <nut-picker v-model:visible="sectionDialog" :columns="endTimeList" title="选择 " @confirm="selectEndTime" :three-dimensional="false"></nut-picker> -->
		<!-- <span>基本信息</span> -->
		<!-- <nut-form>
			<nut-form-item label="借用日期">
				<input class="nut-input-text" v-model="dateValue" @click="dateDialog = true" :disabled="true" placeholder="请选择日期" type="text" />
			</nut-form-item>
			<nut-form-item label="楼层"> -->
		<!-- <input class="nut-input-text" v-model="from.classPostion" @click="floorDialog = true" :disabled="true" placeholder="请选择楼层" type="text" /> -->
		<!-- <picker class="nut-input-text" mode="selector" :range="floorList" range-key="ClassDevicePosition" @change="change">
					<div class="picker">{{ from.classPostion ? from.classPostion : '请选择' }}</div>
				</picker>
			</nut-form-item>
			<nut-form-item label="教室">
				<input class="nut-input-text" v-model="from.deviceName" @click="classDialog = true" :disabled="true" placeholder="请选择教室" type="text" />
			</nut-form-item>
			<nut-form-item label="开始时间">
				<input class="nut-input-text" v-model="from.startTime" @click="startTimeDialog = true" :disabled="true" placeholder="请选择时间" type="text" />
			</nut-form-item>
			<nut-form-item label="结束事件">
				<input class="nut-input-text" v-model="from.endTime" @click="sectionDialog = true" :disabled="true" placeholder="请选择 " type="text" />
			</nut-form-item>
			<nut-form-item :label="item.name" v-for="item in switchList">
				<div class="switch-box">
					<nut-switch v-model="item.switch" style="float: left;" />
				</div>
			</nut-form-item>
			<nut-form-item label="理由">
				<nut-textarea placeholder="请填写申请理由" v-model="from.reason" type="text" />
			</nut-form-item>
			<nut-cell>
				<nut-button type="primary" style="margin-right: 10px" size="small" @click="submit">提交</nut-button>
				<nut-button size="small">重置表单</nut-button>
			</nut-cell>
		</nut-form> -->
	</div>
</template>

<style lang="scss">
.add-rent {
	& > span {
		color: #9da7ae;
		margin-top: 30px;
		margin-left: 20px;
	}
	.switch-box {
		width: 100%;
		height: 100%;
		@include center;
		justify-content: flex-end;
	}
}
</style>
