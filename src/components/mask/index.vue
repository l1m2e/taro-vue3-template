<script lang="ts" setup>
import { ref } from 'vue'
const color = ref('#2c68ff')
defineProps<{
	show: boolean
}>()
</script>

<template>
	<div class="mask" v-if="show">
		<!-- <nut-icon class="icon" name="loading1" size="25" :color="color"></nut-icon> -->
		<p>玩命加载中...</p>
	</div>
</template>

<style lang="scss">
.mask {
	z-index: 999;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background-color: #fafafa;
	opacity: 0.9;
	@include center;
	flex-direction: column;
	& > .icon {
		width: 100px;
		height: 100px;
		animation: fadenum 0.6s inherit;
	}
	& > p {
		margin-top: 30px;
		color: v-bind(color);
	}
	@keyframes fadenum {
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
