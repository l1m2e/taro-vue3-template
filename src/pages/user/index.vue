<script lang="ts" setup>
import { useUserInfo, useLogin, useLogout, useToken, useIsBindUserInfo, useCheckSchoolBind } from '@/composables'

definePageConfig({
	navigationBarTitleText: '我的',
	navigationBarBackgroundColor: '#fafafa',
	usingComponents: {}
})

Taro.useDidShow(() => {
	useCheckSchoolBind() //检查是否绑定了学校
})

const menuList = [
	{
		icon: require('../../assets/user/user.png'),
		text: '个人信息',
		link: '/pages/user/components/userInfo'
	},
	{
		icon: require('../../assets/user/set.png'),
		text: '设置',
		link: '/pages/setting/index'
	}
]
const onMenu = (link: string, text: string) => {
	if (useToken.value) {
		Taro.navigateTo({ url: link })
	} else if (['设置'].includes(text)) {
		Taro.navigateTo({ url: link })
	} else {
		Taro.showToast({ title: '请先登陆', icon: 'error', duration: 2000 })
	}
}

const logout = () => {
	Taro.showModal({
		title: '提示',
		content: '您确定要退出登录吗',
		success: function(res) {
			if (res.confirm) {
				useLogout()
			}
		}
	})
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
	<div class="user">
		<div class="user-card" v-if="useToken">
			<div class="avatar basis-1/4" @click="goToChangeAvatar">
				<image class="w-60px h-60px rounded-full" :src="useIsBindUserInfo ? useUserInfo.avatarUrl : Svg.baseAvatar" />
			</div>
			<div class="text basis-3/4">
				<p class="name">{{ useUserInfo.studentName ? useUserInfo.studentName : '用户' }}</p>
				<p class="signature" v-if="useIsBindUserInfo">{{ useUserInfo.role }}</p>
				<p class="signature" v-else>游客功能受限 请前往个人信息中绑定 {{ useIsBindUserInfo }}</p>
			</div>
		</div>
		<div class="user-card user-card-on-login" v-else>
			<div class="btn-success rounded-24" @click="useLogin">登 录</div>
		</div>
		<div class="menu">
			<div class="menu-item flex" v-for="item in menuList" key="item.text">
				<div class="menu-item-mask" @click="onMenu(item.link, item.text)"></div>
				<div class="menu-item-icon basis-1/4"><image :src="item.icon"></image></div>
				<div class="basis-4/2 p-10px">
					<span>{{ item.text }}</span>
				</div>
				<div class="menu-item-right basis-4/1" :span="4"><div class="i-ri-arrow-right-s-line font-14"></div></div>
			</div>
		</div>
		<div class="logout" v-if="useToken" @click="logout"><span>退出账号</span></div>
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
		padding: 20px 0 20px 0;
		margin: 0 auto;
		box-sizing: border-box;
		@include shadow-1;
		.menu-item {
			width: 100%;
			height: 100px;
			margin-top: 10px;
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
		height: 80px;
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
