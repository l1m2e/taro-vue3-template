<script lang="ts" setup>
import Taro, { useDidShow } from '@tarojs/taro'
import { loginApi } from '@/api'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

definePageConfig({
	navigationBarTitleText: '我的',
	navigationBarBackgroundColor: '#fafafa'
})
useDidShow(() => {
	isToken.value = Taro.getStorageSync('token')
})
const avatar = ref(Taro.getStorageSync('avatar'))
const isToken = ref(Taro.getStorageSync('token'))
const userName = ref(Taro.getStorageSync('userName'))

let code = ''
const getCode = () => {
	Taro.login({
		success(e) {
			code = e.code
		}
	})
}

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

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
			const { data: res, statusCode } = await loginApi(parmas)
			// 已经登录过 返回token
			if (res.token) {
				Taro.setStorageSync('token', res.token)
				isToken.value = true
				if (res.role === '游客') {
					//绑定用户信息逻辑
					Taro.navigateTo({
						url: '/pages/user/components/bindUserInfo'
					})
				}
				return
			}
			if (statusCode === 401) {
				// 未登录过且用户跳转了绑定手机号
				Taro.navigateTo({
					url: '/pages/user/components/bindPhone'
				})
			}
		}
	})
}

const menuList = [
	{
		icon: require('../../assets/user/user.png'),
		text: '个人信息',
		link: '/pages/user/components/userInfo'
	},
	{
		icon: require('../../assets/user/set.png'),
		text: '设置',
		link: ''
	}
]
const onMenu = (link: string) => {
	Taro.navigateTo({
		url: link
	})
}

//登出
const tipDialog = ref(false)
const logoutButton = () => {
	tipDialog.value = true
}
const logout = () => {
	Taro.removeStorageSync('token')
	isToken.value = false
}
</script>

<template>
	<!-- <div class="user">
		<nut-dialog title="提示" content="退出账号后需要重新登录" v-model:visible="tipDialog" @ok="logout" />
		<nut-row class="user-card" v-if="isToken">
			<nut-col :span="6" class="avatar">
				<nut-avatar size="large" :icon="avatar"></nut-avatar>
			</nut-col>
			<nut-col :span="18" class="text">
				<p class="name">{{ userName ? userName : '用户' }}</p>
				<p class="signature">学生</p>
			</nut-col>
		</nut-row>
		<nut-row class="user-card user-card-on-login" v-else>
			<nut-button type="success" @click="login">登 录</nut-button>
		</nut-row>
		<div class="menu">
			<nut-row class="menu-item" v-for="item in menuList" key="item.text">
				<div class="menu-item-mask" @click="onMenu(item.link)"></div>
				<nut-col class="menu-item-icon" :span="3"><image :src="item.icon"></image></nut-col>
				<nut-col :span="17">
					<span>{{ item.text }}</span>
				</nut-col>
				<nut-col class="menu-item-right" :span="4"><nut-icon name="right" size="14"></nut-icon></nut-col>
			</nut-row>
		</div>
		<div class="logout" v-if="isToken" @click="logoutButton"><span>退出账号</span></div>
		<div class="btn">111</div>
	</div> -->
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
		align-items: flex-start;
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
		padding: 40px 0 40px 0;
		margin: 0 auto;
		box-sizing: border-box;
		@include shadow-1;
		.menu-item {
			width: 100%;
			height: 70px;
			margin-top: 20px;
			display: flex;
			align-items: center;
			position: relative;
			box-sizing: border-box;
			padding: 0 40px 0 40px;
			.menu-item-mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
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
	.logout {
		@include center;
		width: 95%;
		height: 70px;
		background-color: white;
		margin: 0 auto;
		margin-top: 30px;
		border-radius: 20px;
		@include shadow-1;
		span {
			font-size: 27px;
		}
	}
	.logout:active,
	.menu-item:active {
		background-color: #fafafa;
	}
}
</style>
