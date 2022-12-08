<script lang="ts" setup>
import { useIsBindUserInfo, useUserInfo, useSchoolInfo } from '@/composables'
import { Svg } from '@/assets/img/image'
definePageConfig({
	navigationBarTitleText: '个人信息',
	navigationBarBackgroundColor: '#f7f8fa'
})
const goToBindUserInfo = () => {
	Taro.navigateTo({ url: '/pages/user/components/bindUserInfo' })
}
const goToChangeAvatar = () => {
	if (useIsBindUserInfo) {
		Taro.navigateTo({ url: '/pages/user/components/change-avatar' })
	} else {
		Taro.showToast({ title: '需绑定|登录', icon: 'success', duration: 2000 })
	}
}
</script>

<template>
	<div>
		<span>用户信息</span>
		<div class="avatar border-b-1 border-b-gray100" @click="goToChangeAvatar()">
			<span>头像</span>
			<div class="center">
				<image :src="useIsBindUserInfo ? useUserInfo.avatarUrl : Svg.baseAvatar" alt="" class="w-30px h-30px" />
				<div class=" ml-5px color-gray i-ri-arrow-right-s-line"></div>
			</div>
		</div>
		<span>绑定的信息</span>
		<div v-if="useUserInfo.studentName">
			<div class="cell">
				<div>学校</div>
				<div>{{ useSchoolInfo.school_Name }}</div>
			</div>
			<div class="cell" v-if="useUserInfo.role === '学生'">
				<div>班别</div>
				<div>{{ useUserInfo.className }}</div>
			</div>
			<div class="cell">
				<div>姓名</div>
				<div>{{ useUserInfo.studentName }}</div>
			</div>
			<div class="cell">
				<div>身份</div>
				<div>{{ useUserInfo.role }}</div>
			</div>
			<div class="cell">
				<div>{{ useUserInfo.role === '学生' ? '学号' : '工号' }}</div>
				<div>{{ useUserInfo.studentId }}</div>
			</div>
		</div>
		<div v-else class="w-95% m-auto bg-#ffffff center h-300px rounded-lg flex-col">
			<div class="mb-30px text-20px">您还没有绑定您的身份信息</div>
			<div>这将导致大部分功能受限</div>
			<div class="mt-30px w-200px h-40px text-center leading-40px  bg-#23a276 color-white rounded-full box-border active:bg-#16664a" @click="goToBindUserInfo">前往绑定</div>
		</div>
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
	span {
		font-size: 16PX;
		color: black;
		margin: 0 0 0 0;
	}
}
</style>
