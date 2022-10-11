<script lang="ts" setup>
import Taro from '@tarojs/taro'
definePageConfig({
	navigationBarTitleText: '借用',
	navigationBarBackgroundColor: '#fafafa'
})
const addRent = () => {
	Taro.navigateTo({
		url: '/pages/rent-classroom/components/add-rent'
	})
}
</script>

<template>
	<div class="rent-classroom">
		<div class="addBtn" @click="addRent"><nut-icon name="uploader"></nut-icon></div>
	</div>
</template>

<style lang="scss">
.rent-classroom {
	& > .addBtn {
		width: 100px;
		height: 100px;
		background-color: #49b583;
		position: fixed;
		top: 85vh;
		right: 5vw;
		border-radius: 100%;
		@include center;
		.nut-icon {
			font-size: 20px;
			color: white;
		}
	}
}
</style>
