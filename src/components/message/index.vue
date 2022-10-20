<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		default: ''
	},
	message: {
		type: String,
		default: 'info'
	}
})
// const type = {
// 	error: '#f52f3e',
// 	warning: '#ff9c00',
// 	success: '#0ed57d',
// 	info: '#2c68ff'
// }
</script>

<template>
	<div class="message">埃里克就个垃圾</div>
</template>

<style lang="scss">
.message {
	position: fixed;
	top: 0;
	z-index: 99999;
	width: 100vw;
	height: 60px;
	background-color: #2c68ff;
	color: white;
}
</style>
