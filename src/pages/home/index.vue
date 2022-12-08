<script lang="ts" setup>
import studentsHome from '@/pages/course/index.vue'
// import teacherHome from '@/pages/rent-classroom/index.vue'
definePageConfig({
	navigationBarTitleText: '课程',
	navigationBarBackgroundColor: '#fafafa',
	enablePullDownRefresh: true,
	backgroundTextStyle: 'dark',
	backgroundColor: '#fafafa'
})

const studentsHomeRef = ref()
//下拉刷新
Taro.usePullDownRefresh(() => {
	Taro.startPullDownRefresh()
	studentsHomeRef.value.getCourseist()
	Taro.stopPullDownRefresh()
})
</script>

<template>
	<div class="home">
		<studentsHome ref="studentsHomeRef"></studentsHome>
	</div>
</template>

<style lang="scss"></style>
