<script lang="ts" setup>
import { bindUserInfoApi } from '@/api'

definePageConfig({
	navigationBarTitleText: '绑定用户信息',
	navigationBarBackgroundColor: '#f7f8fa'
})

const msg = reactive({
	show: false,
	desc: '',
	type: 'primary'
})

const NUmessage = (type: string = 'primary', desc: string = '成功') => {
	msg.desc = desc
	msg.type = type
	msg.show = true
}

const show = ref(false)
const columns = ref([
	{ text: '老师', value: '老师', role: 'Teacher' },
	{ text: '学生', value: '学生', role: 'Student' }
])

const desc = ref('学生')
const confirm = ({ selectedValue, selectedOptions }) => {
	console.log(selectedOptions)
	desc.value = selectedValue.join(',')
}

const identity = computed(() => (desc.value === '老师' ? '工号' : '学号'))
const formData = reactive({
	name: '',
	id: ''
})

const tipDialog = ref(false)
const onOk = async () => {
	const params = {
		name: formData.name,
		studentId: formData.id,
		type: desc.value === '老师' ? 'Teacher' : 'Student'
	}
	const { data: res, statusCode } = await bindUserInfoApi(params)
	if (statusCode === 401) {
		return NUmessage('danger', res.message)
	}
	if (statusCode === 500) {
		return NUmessage('danger', res.message)
	}
	console.log(res)
}
const onButton = () => {
	if (!formData.name) {
		return NUmessage('danger', '请输入姓名')
	}
	if (!formData.id) {
		return NUmessage('danger', `请输入${identity.value}`)
	}
	tipDialog.value = true
}
</script>

<template>
	<!-- <div>
		<nut-notify v-model:visible="msg.show" :msg="msg.desc" :type="msg.type" />
		<nut-dialog title="请检查信息是否有误" content="绑定个人信息后无法更改" v-model:visible="tipDialog" @ok="onOk" />
		<span>基本信息</span>
		<nut-form :model-value="formData" ref="ruleForm">
			<nut-cell
				title="请选您的身份"
				:desc="desc"
				@click="
					() => {
						show = true
					}
				"
			></nut-cell>
			<nut-form-item label="姓名" prop="name">
				<input v-model="formData.name" class="nut-input-text" placeholder="请输入姓名" type="text" />
			</nut-form-item>
			<nut-form-item :label="identity" prop="id">
				<input v-model="formData.id" class="nut-input-text" :placeholder="`请输入${identity}`" type="text" />
			</nut-form-item>
		</nut-form>
		<nut-picker v-model:visible="show" :columns="columns" title="身份选择" @confirm="confirm"></nut-picker>
		<div class="button">
			<nut-button @click="onButton" type="info">提交</nut-button>
		</div> -->
	<!-- </div> -->
</template>

<style lang="scss">
page {
	background-color: #f7f8fa;
}
span {
	color: #9da7ae;
	margin-top: 30px;
	margin-left: 20px;
}
.button {
	@include center;
	width: 100%;
	margin: 60px auto;
}
</style>
