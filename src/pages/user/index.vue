<script lang="ts" setup>
import Taro, { useDidShow } from '@tarojs/taro'
import { loginApi } from '@/api'
import { ref } from 'vue'
definePageConfig({
	navigationBarTitleText: '我的',
	navigationBarBackgroundColor: '#fafafa',
	backgroundColor: '#fafafa'
})

const avatar = ref(Taro.getStorageSync('avatar'))
const isToken = ref(Taro.getStorageSync('token'))
const userName = ref(Taro.getStorageSync('userName'))

let code = ''
useDidShow(() => {
	// getCode()
})
const getCode = () => {
	Taro.login({
		success(e) {
			code = e.code
			console.log(e.code)
		}
	})
}
const login = () => {
	getCode()
	Taro.getUserProfile({
		desc: '用于完善用户信息',
		async success(user) {
			Taro.setStorageSync('userName', user.userInfo.nickName)
			Taro.setStorageSync('sex', user.userInfo.gender)
			Taro.setStorageSync('avatar', user.userInfo.avatarUrl)
			avatar.value = user.userInfo.avatarUrl
			userName.value = user.userInfo.nickName
			const parmas = {
				code,
				encryptedData: user.encryptedData,
				iv: user.iv
			}
			const { data: res } = await loginApi(parmas)
			// 已经登录过 返回token
			if (res.token) {
				Taro.setStorageSync('token', res.token)
				return
			}
			// 未登录过跳转绑定手机号
			Taro.navigateTo({
				url: '/pages/user/components/bindPhone'
			})
		}
	})
}

const menuList = [
	{
		icon: '../../assets/tab-bar/home-active.png',
		text: '个人信息管理',
		link: ''
	},
	{
		icon: '../../assets/user/set.png',
		text: '设置',
		link: ''
	}
]
</script>

<template>
	<div class="user">
		<nut-row class="user-card" v-if="isToken">
			<nut-col :span="6" class="avatar">
				<nut-avatar size="large" :icon="avatar"> </nut-avatar>
			</nut-col>
			<nut-col :span="18" class="text">
				<p class="name">{{ userName ? userName : '用户' }}</p>
				<p class="signature">学生</p>
			</nut-col>
		</nut-row>
		<nut-row class="user-card user-card-on-login" v-else>
			<!-- <span>登录</span> -->
			<nut-button type="success" @click="login">登 录</nut-button>
		</nut-row>
		<div class="menu">
			<nut-row class="menu-item" v-for="item in menuList" key="item.text">
				<nut-col class="menu-item-icon" :span="3"> <image :src="item.icon"></image></nut-col>
				<nut-col :span="17">
					<span>{{ item.text }}</span>
				</nut-col>
				<nut-col class="menu-item-right" :span="4"> <nut-icon name="right" size="16"></nut-icon></nut-col>
			</nut-row>
		</div>
	</div>
</template>

<style lang="scss">
page {
	background-color: #fafafa;
}
.user {
	.user-card {
		width: 95%;
		height: 220px;
		background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
		margin: 20px auto;
		border-radius: 30px;
		@include center;
	}
	.user-card-on-login {
		background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
	}
	.avatar,
	.text {
		@include center;
		height: 100%;
	}
	.text {
		flex-direction: column;
		align-items: start;
		.name {
			font-size: 40px;
			font-weight: bold;
		}
		.signature {
			margin-top: 10px;
			font-size: 25px;
		}
	}
	.menu {
		background-color: white;
		width: 95%;
		margin-top: 20px;
		border-radius: 30px;
		padding: 40px;
		margin: 0 auto;
		box-sizing: border-box;
		.menu-item {
			width: 100%;
			height: 70px;
			margin-top: 20px;
			display: flex;
			align-items: center;
			.menu-item-icon {
				display: flex;
				align-items: center;
			}
			.menu-item-right {
				display: flex;
				justify-content: flex-end;
			}
			image {
				object-fit: cover;
				width: 50px;
				height: 50px;
			}
			span {
				font-size: 30px;
			}
		}
		.menu-item:first-child {
			margin-top: 0;
		}
	}
}
</style>
