<script lang="ts" setup>
import { useSchoolInfo } from '@/composables'
definePageConfig({
	navigationBarTitleText: '设置',
	navigationBarBackgroundColor: '#fafafa'
})

const goToBindSchool = () => {
	Taro.navigateTo({
		url: '/pages/user/components/bindSchool'
	})
}
const storeCurrentSize = ref(0)
const getStorageInfo = () => {
	Taro.getStorageInfo({
		success: function(res) {
			storeCurrentSize.value = res.currentSize
		}
	})
}
getStorageInfo()
const accountInfo = Taro.getAccountInfoSync()
const version = accountInfo.miniProgram.version

const clearStore = () => {
	Taro.showModal({
		title: '警告',
		content: '清理缓存后需要重新登陆',
		success: function(res) {
			if (res.confirm) {
				Taro.clearStorage()
				getStorageInfo()
			}
		}
	})
}
</script>

<template>
	<div class="setting">
		<div class="bg-white h-50px grid grid-cols-24 px-10px box-border justify-startbox-border border-b-1 border-b-gray100 items-center active:bg-gray1'" @click="goToBindSchool">
			<div class="col-span-2 color-purple-5 i-ri-building-2-line "></div>
			<div class="col-span-10">更改绑定的学校</div>
			<div class="col-span-10 text-end color-gray truncate">{{ useSchoolInfo.school_Name ? useSchoolInfo.school_Name : '请选择您的学校' }}</div>
			<div class="col-span-2 ml-10px text-24px  color-gray i-ri-arrow-right-s-line"></div>
		</div>
		<div class="bg-white h-50px grid grid-cols-24 px-10px box-border justify-start box-border border-b-1 border-b-gray100 items-center active:bg-gray1" @click="clearStore">
			<div class="col-span-2 color-red-5 i-ri-delete-bin-6-line"></div>
			<div class="col-span-18">清理全部缓存</div>
			<div class="col-span-4 text-right color-gray">{{ storeCurrentSize }} kb</div>
		</div>
		<div class="bg-white h-50px grid grid-cols-24 px-10px box-border justify-start  items-center active:bg-gray1'" @click="">
			<div class="col-span-2 color-green-5 i-ri-mini-program-line"></div>
			<div class="col-span-18">软件版本</div>
			<div class="col-span-4 text-right color-gray">V {{ version }}</div>
		</div>
	</div>
</template>
