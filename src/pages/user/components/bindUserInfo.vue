<script lang="ts" setup>
import { useUpdateUserInfo, useGetUserInfo } from '@/composables'
import Svg from '@/assets/img/image'
definePageConfig({
	navigationBarTitleText: '绑定个人信息'
})

const role = ref('Student')
const form = reactive({
	studentName: '',
	studentId: '',
	type: ''
})

const bindUserInfo = async () => {
	if (form.studentName === '' || form.studentId === '') return Taro.showToast({ title: '信息不完整', icon: 'error', duration: 2000 })
	const res = await api.bindUserInfoApi({ ...form, type: role.value })
	if (res.statusCode === 200) {
		useUpdateUserInfo({ ...res.data, role: res.data.type === 'Student' ? '学生' : '老师' }) //更新用户信息
		useGetUserInfo()
		Taro.switchTab({ url: '/pages/user/index' })
	} else {
		Taro.showToast({ title: res.data?.message || '服务器有误', icon: 'error', duration: 2000 })
	}
}
</script>

<template>
	<div class="bind-user-info h-100vh w-100% bg-white">
		<div class="w-100% h-150px center">
			<image :src="Svg.baseAvatar" class="w-100px h-100px rounded-full" />
		</div>
		<div class="px-20px mt-20px box-border">
			<div class="w-100% h-auto center justify-between bg-#b1efd9d1 rounded-15px m-auto">
				<div :class="`button  ${role === 'Student' ? '.button-activation' : ''}`" @click="role = 'Student'">学生</div>
				<div :class="`button  ${role !== 'Student' ? '.button-activation' : ''}`" @click="role = 'Teacher'">老师</div>
			</div>
			<div class="pt-20px">姓名</div>
			<div class="input"><input v-model="form.studentName" type="text" placeholder="请输入您的真实姓名" /></div>
			<div class="pt-20px">{{ role === 'Student' ? '学号' : '工号' }}</div>
			<div class="input"><input v-model="form.studentId" type="text" :placeholder="`请输入您的${role === 'Student' ? '学号' : '工号'}`" /></div>
		</div>
		<div class="w-200px h-40px text-center leading-40px m-auto mt-50px bg-#23a276 color-white rounded-full box-border active:bg-#16664a" @click="bindUserInfo">提交</div>
	</div>
</template>

<style lang="scss">
.bind-user-info {
	.button {
		flex: 1;
		background-color: #b1efd9d1;
		text-align: center;
		height: 80px;
		line-height: 80px;
		border-radius: 15px;
		color: #2a9670;
		transition: all 0.1s;
	}
	.button-activation {
		background-color: #23a276;
		color: white;
	}
	.input {
		background-color: #faf9f8;
		width: 100;
		border-radius: 15px;
		margin-top: 20px;
		padding: 20px;
		box-sizing: border-box;
		input {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
