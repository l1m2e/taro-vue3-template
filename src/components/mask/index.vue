<script lang="ts" setup>
defineProps<{
	show: boolean
}>()
</script>

<template>
	<div class="mask fixed left-0 top-0 bottom-0 right-0 bg-#fafafa opacity-90 flex-col z-99999 center" v-if="show">
		<div class="i-ri-loader-5-line color-blue w-50px h-50px animate-spin"></div>
		<p class="mt-30px color-blue">玩命加载中...</p>
	</div>
</template>
