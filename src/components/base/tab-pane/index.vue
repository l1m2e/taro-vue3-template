<script setup lang="ts">
defineProps<{
	name: string
}>()
const emit = defineEmits(['buttomLoad'])
const lower = () => {
	emit('buttomLoad')
}
</script>

<template>
	<scroll-view :scroll-y="true" :lowerThreshold="50" @scrolltolower="lower" class="scroll">
		<slot></slot>
	</scroll-view>
</template>
