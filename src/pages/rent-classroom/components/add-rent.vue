<script lang="ts" setup>
import { getFloorApi, getClassListApi, getCourseListApi, addRentClassroomApi } from '@/api'
import { changeTextToCN } from '@/utils/changeTextToCN'
import dayjs from 'dayjs'

definePageConfig({
	navigationBarTitleText: '申请借用'
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

const dateValue = ref() //日期对话框 选中的值
const floorList = ref<any[]>([]) //楼层选择器数组
const classList = ref<any[]>([]) //教室选择器数组
const startTimeList = ref<any[]>([]) // 开始时间选择器数组
const endTimeList = ref<any[]>([]) // 时间结束选择器数组

const courseListList = ref() //所有课程信息数组

// api --- end
const switchList = ref([
	{ switch: false, name: '系统开', index: 0 },
	{ switch: false, name: '灯光开', index: 1 },
	{ switch: false, name: '空调开', index: 2 },
	{ switch: false, name: '窗帘开', index: 3 },
	{ switch: false, name: '风扇开', index: 4 }
])

//提交
const submit = async () => {
	const startTime = dayjs(`${dateValue.value} ${from.startTime}`).valueOf()
	const endTime = dayjs(`${dateValue.value} ${from.endTime}`).valueOf()
	const openBit: Array<number> = []
	switchList.value.forEach((item: any) => {
		if (item.switch) {
			openBit.push(1)
		} else {
			openBit.push(0)
		}
	})
	from.openBit = openBit.toString().replace(/,/g, '')
	//判空
	const isNull = checkParam({ ...from, startTime, endTime })
	console.log('isNull', isNull)
	if (!isNull) return Taro.showToast({ title: '请填写完整信息', icon: 'error', duration: 2000 })
	//api
	const res = await addRentClassroomApi({ ...from, startTime, endTime })
	if (res.statusCode == 200) {
		Taro.showToast({ title: '提交成功', icon: 'success', duration: 2000 })
		emptyForm()
	}
}
//检查提交的参数
type Ifrom = typeof from
const checkParam = (obj: Ifrom) => {
	for (let key in obj) {
		if (!obj[key]) return false
	}
	return true
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
	from.classPostion = floorList.value[parseInt(e.detail.value)].classDevicePosition
	getClassList()
}

//教室选择触发
const classRoomChange = (e: any) => {
	cleanFrom('class')
	from.deviceName = classList.value[parseInt(e.detail.value)].classDeviceName
	from.classMAC = classList.value[parseInt(e.detail.value)].classDeviceMac
	getCourseList()
}

// 选择开始时间
const startTimeChange = (e: any) => {
	cleanFrom('startTime')
	from.startTime = startTimeList.value[parseInt(e.detail.value)].beginTime
	endTimeList.value = screenSection(startTimeList.value[parseInt(e.detail.value)].curIndex)
}

// 选择结束时间
const endTimeChange = (e: any) => {
	from.endTime = endTimeList.value[parseInt(e.detail.value)].endTime
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
			item.text = `第${changeTextToCN(parseInt(item.curIndex) + 1)}节`
			item.value = item.beginTime
		})
		courseListList.value = res.data.today
		const noCourse = res.data.today.filter((item: any) => item.courseName === '') // 筛选没有课程的
		startTimeList.value = noCourse.filter((item: any) => dayjs(`${dayjs(dateValue.value).format('YYYY-MM-DD')} ${item.beginTime}`).valueOf() >= dayjs().valueOf()) // 筛选开始时间小于当前时间
	}
}

//筛选课程信息
const screenSection = (id: string) => {
	//先筛掉被选中时间段之前的课程
	const tempArr: Array<any> = courseListList.value.filter((item: any) => parseInt(item.curIndex) >= parseInt(id))
	const index = tempArr.findIndex((item: any) => item.courseName !== '')
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
			item.text = item.classDevicePosition
			item.value = item.classDevicePosition
		})
		floorList.value = res.data.list
	}
}

//获取教室列表
const getClassList = async () => {
	const res = await getClassListApi(from.classPostion)
	if (res.statusCode === 200) {
		//格式化为选择器可以使用的数据结构
		res.data.forEach((item: any) => {
			item.text = item.classDeviceName
			item.value = item.classDeviceMac
		})
		classList.value = res.data
	}
}

//清楚表单函数
const cleanFrom = (type: string = 'all') => {
	switch (type) {
		case 'all':
			from.deviceName = '' // 清空教室名称
			from.startTime = 0 //清空开始时间表单
			from.endTime = 0 // 清空结束时间表单
			classList.value.length = 0 // 清空教室选择器数组
			startTimeList.value.length = 0 // 清空开始时间选择器数组
			endTimeList.value.length = 0 //清空结束时间选择器数组
			break
		case 'class':
			from.startTime = 0
			from.endTime = 0
			break
		case 'startTime':
			from.endTime = 0
			endTimeList.value.length = 0
			break
	}
}
const onCheckBoxChange = (e) => {
	switchList.value.forEach((item: any) => {
		item.switch = false
	})
	e.detail.value.forEach((item: string) => {
		switchList.value[parseInt(item)].switch = true
	})
}
//输入理由触发
const onTextareaChange = (e) => {
	from.reason = e.detail.value
}

//清空表单
const emptyForm = () => {
	for (let key in from) {
		from[key] = ''
	}
	dateValue.value = ''
	switchList.value.forEach((item) => {
		item.switch = false
	})
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
			<picker mode="selector" :range="floorList" range-key="classDevicePosition" @change="floorChange">
				<div class="text-gray">{{ from.classPostion ? from.classPostion : '请选择' }}</div>
			</picker>
		</div>
		<div class="cell">
			<span>选择教室</span>
			<picker mode="selector" :range="classList" range-key="classDeviceName" @change="classRoomChange">
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
		<div class="p-10px box-border">
			<div class="mb-10px">功能选择</div>
			<checkbox-group @change="onCheckBoxChange" class="grid grid-cols-3 gap-10px justify-items-center my-20px">
				<checkbox :value="item.index" :checked="item.switch" v-for="item in switchList">{{ item.name }}</checkbox>
			</checkbox-group>
			<textarea
				class="border-1 border-gray100 rounded-md w-100% p-10px box-border focus-within-border-emerald mt-10px"
				auto-height
				placeholder="请输入申请理由"
				v-model="from.reason"
				:onInput="onTextareaChange"
			/>
			<div class="w-100% flex justify-end">
				<div class="btn-success mt-20px" @click="submit">提交</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.add-rent {
	overflow: hidden;
	height: 100vh;
	background-color: #fff;
}
</style>
