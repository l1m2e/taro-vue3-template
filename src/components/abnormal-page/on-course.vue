<script lang="ts" setup>
import { baseUrl } from '@/config/baseUrl'
import { useWifi } from '@/composables'
useWifi()
</script>

<template>
	<div class="w-100% center flex-col">
		<img :src="`${baseUrl}/applet/image/wifi.svg`" alt="" class="w-100% object-contain" />
		<div class="text-20px color-gray">当前无课程您无需签到</div>
	</div>
</template>

<style lang="scss"></style>
