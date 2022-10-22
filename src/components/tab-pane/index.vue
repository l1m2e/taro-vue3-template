<script lang="ts" setup>
defineProps<{
	name: string
	tab: string
}>()
</script>

<template>
	<div>
		<slot></slot>
	</div>
</template>

<style lang="scss"></style>
