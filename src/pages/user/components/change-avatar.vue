<script lang="ts" setup>
import { baseUrl } from '@/config/baseUrl'
import { useUserInfo } from '@/composables'
definePageConfig({
	navigationBarTitleText: '修改头像'
})
const avatarList = ref([])
const activeItem = ref('') // 激活的 item
const getAvatarList = async () => {
	const res = await api.getAvatarList()
	if (res.statusCode === 200) {
		avatarList.value = res.data
	}
}
getAvatarList()
const select = (fileName: string) => {
	activeItem.value = fileName
}
const saveAvatar = async () => {
	const res = await api.changeAvatar(activeItem.value)
	if (res.statusCode) {
		useUserInfo.value.avatarUrl = `${baseUrl.value}/applet/image/avatar/${activeItem.value}`
		Taro.showToast({ title: '头像保存成功', icon: 'success', duration: 2000 })
		Taro.switchTab({ url: '/pages/user/index' })
	} else {
		Taro.showToast({ title: '头像保存失败', icon: 'error', duration: 2000 })
	}
}
</script>

<template>
	<div class="changeAvatar px-10px box-border">
		<div class="w-100% max-h-70vh grid grid-cols-4 gap-4">
			<div v-for="item in avatarList" class="w-100% max-h-80px center" @click="select(item)">
				<image :src="`${baseUrl}/applet/image/avatar/${item}`" :class="`${activeItem === item ? 'activeImg' : ''} center w-100% max-h-80px  p-2px box-border`"></image>
			</div>
		</div>
		<div class="w-100% h-30vh center">
			<div class="btn-success w-80% h-30px center text-16px rounded-full" @click="saveAvatar">保存头像</div>
		</div>
	</div>
</template>

<style lang="scss">
.changeAvatar {
	width: 100%;
	height: 100vh;
	background-color: white;
	.activeImg {
		border: solid 5px#14b8a6;
		border-radius: 100%;
	}
}
</style>
