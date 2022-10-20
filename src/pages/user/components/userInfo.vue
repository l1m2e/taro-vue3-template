<script lang="ts" setup>
import { getUserInfoApi } from '@/api'
import { ref } from 'vue'
definePageConfig({
	navigationBarTitleText: '个人信息',
	navigationBarBackgroundColor: '#f7f8fa'
})
const userName = ref('')
const sex = ref('')
const avater = ref('')
const schoolName = ref('')
const identity = ref('')
const name = ref('')
const id = ref('')
const className = ref('')
const fn = async () => {
	const { data: res } = await getUserInfoApi()
	userName.value = res.nickname
	sex.value = res.schoolUser.gender
	avater.value = res.avater
	schoolName.value = res.schoolUser.schoolName
	identity.value = res.schoolUser.type === 'Student' ? '学生' : '老师'
	name.value = res.schoolUser.name
	id.value = res.schoolUser.cardId
	className.value = res.schoolUser.className
}
fn()
</script>

<template>
	<div>
		<span>用户信息</span>
		<!-- <div class="avatar">
			<span>头像</span>
			<nut-avatar shape="square" size="small" :icon="avater"></nut-avatar>
		</div>
		<nut-cell title="用户名" :desc="userName"></nut-cell>
		<nut-cell title="性别" :desc="sex"></nut-cell>
		<span>绑定的信息</span>
		<nut-cell title="学校" :desc="schoolName"></nut-cell>
		<nut-cell title="身份" :desc="identity"></nut-cell>
		<nut-cell title="姓名" :desc="name"></nut-cell>
		<nut-cell :title="identity === '学生' ? '学号' : '工号'" :desc="id"></nut-cell>
		<nut-cell title="班别" :desc="className"></nut-cell> -->
	</div>
</template>

<style lang="scss">
page {
	background-color: #f7f8fa;
}
.nut-cell {
	margin-top: 0;
	margin-bottom: 15rpx;
}
span {
	color: #9da7ae;
	margin-top: 30px;
	margin-left: 20px;
	margin-bottom: 20px;
}
//prettier-ignore
.avatar {
	padding-left: 16PX;
	padding-right: 16PX;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	height: 50PX;
	background-color: white;
	margin-bottom: 15rpx;
	span {
		font-size: 16PX;
		color: black;
		margin: 0 0 0 0;
	}
}
</style>
