<script lang="ts" setup>
import studentsHome from '@/pages/students/course/index.vue'
// import teacherHome from '@/pages/rent-classroom/index.vue'
import { useIsGoToUserPage } from '@/composables'
import { selected } from '@/store/tab-bar'

definePageConfig({
	navigationBarTitleText: '课程',
	navigationBarBackgroundColor: '#fafafa',
	enablePullDownRefresh: true,
	backgroundTextStyle: 'dark',
	backgroundColor: '#fafafa'
})
//检查是否有token 如果没有 跳转到我的页面
useIsGoToUserPage()
//重置选中的tabbar
selected.value = 0
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
