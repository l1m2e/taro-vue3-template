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
console.log('[ useSchoolInfo ] >', useSchoolInfo)
</script>

<template>
	<div>
		<div class="bg-white h-50px grid grid-cols-24 px-10px box-border justify-start items-center active:bg-gray1'" @click="goToBindSchool">
			<div class="col-span-2 color-green-5 i-ri-building-2-line "></div>
			<div class="col-span-10">更改绑定的学校</div>
			<div class="col-span-10 text-end color-gray truncate">{{ useSchoolInfo.school_Name ? useSchoolInfo.school_Name : '请选择您的学校' }}</div>
			<div class="col-span-2 ml-10px text-24px  color-gray i-ri-arrow-right-s-line"></div>
		</div>
	</div>
</template>

<style lang="scss"></style>
