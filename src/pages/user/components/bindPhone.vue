<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { bindPhoneApi } from '@/api'
definePageConfig({
	navigationBarTitleText: '授权'
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

const name = Taro.getStorageSync('userName')
const avatar = Taro.getStorageSync('avatar')

const getPhoneNumber = async (e: any) => {
	if (e.detail.code) {
		Taro.login({
			async success(v) {
				const { data: res } = await bindPhoneApi({ code: e.detail.code, openCode: v.code })
				if (res.token) {
					Taro.setStorageSync('token', res.token)
					NUmessage('success', '绑定成功')
					Taro.switchTab({
						url: '/pages/home/index'
					})
				} else {
					NUmessage('danger', '绑定失败 请联系管理员')
				}
			}
		})
	} else {
		NUmessage('danger', '使用本程序需要授权')
	}
}
</script>

<template>
	<!-- <div>
		<nut-notify v-model:visible="msg.show" :msg="msg.desc" :type="msg.type" />
		<div class="icon">
			<nut-avatar size="large" :icon="avatar"></nut-avatar>
		</div>
		<div>
			<p class="h1">你好,{{ name }}</p>
			<p class="h1">莱托智能需要你的授权</p>
			<p class="h2">莱拓智能不会将你的信息提供给第三方</p>
		</div>
		<div class="button">
			<nut-button block type="info" open-type="getPhoneNumber" size="large" @getphonenumber="getPhoneNumber">
				授权
			</nut-button>
		</div>
	</div> -->
</template>

<style lang="scss">
.h1 {
	font-size: 40px;
	font-weight: 700;
	text-align: center;
	margin-top: 30px;
}
.h2 {
	font-size: 30px;
	color: #c6c8ce;
	text-align: center;
	margin-top: 100px;
}
.icon {
	width: 100%;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.button {
	width: 80%;
	margin: 0 auto;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
