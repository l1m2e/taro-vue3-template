<script lang="ts" setup>
import dayjs from 'dayjs'
import onCourse from '@/components/abnormal-page/on-course.vue'
definePageConfig({
	navigationBarTitleText: '签到'
})
const signList = ref<any[]>([])
const getSignList = async () => {
	const res = await api.getSignList({ time: +dayjs() })
	if (res.statusCode === 200) {
		signList.value = res.data
		console.log('[ res.data ] >', res.data)
		console.log('%c [ signList.value ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', signList.value)
	}
}
getSignList()
</script>

<template>
	<div class="w-100vw min-h-100vh bg-white">
		<onCourse v-if="signList.length === 0"></onCourse>
	</div>
</template>

<style lang="scss"></style>
