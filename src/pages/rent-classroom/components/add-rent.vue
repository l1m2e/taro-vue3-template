<script lang="ts" setup>
import { reactive, ref } from 'vue'

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
const dateValue = ref() //日期对话框 选中的值
const opennDateDialog = () => {
	dateDialog.value = true
}
const selectDate = (e: Array<string>) => {
	dateValue.value = e[3]
}
</script>

<template>
	<div class="add-rent">
		<nut-calendar v-model:visible="dateDialog" :default-value="dateValue" @choose="selectDate"></nut-calendar>
		<span>基本信息</span>
		<nut-form>
			<nut-form-item label="借用日期">
				<input class="nut-input-text" v-model="dateValue" @click="opennDateDialog" :disabled="true" placeholder="请选择地址" type="text" />
			</nut-form-item>
			<nut-form-item label="年龄">
				<input class="nut-input-text" placeholder="请输入年龄" type="text" />
			</nut-form-item>
			<nut-form-item label="联系电话">
				<input class="nut-input-text" placeholder="请输入联系电话" type="text" />
			</nut-form-item>
			<nut-form-item label="地址">
				<input class="nut-input-text" placeholder="请输入地址" type="text" />
			</nut-form-item>
			<nut-form-item label="备注">
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
