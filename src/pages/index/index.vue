<script lang="ts" setup>
import { testDelete, testPost, testGet } from '@/api'
const get = async () => {
	const res = await testGet({ test: 1 })
	console.log(res)
}
const post = async () => {
	const res = await testPost({ test: 2 })
	console.log(res)
}
const deletefn = async () => {
	const res = await testDelete({ test: 3 })
	console.log(res)
}
</script>

<template>
	<div>
		<nut-button type="info" @click="get">发送get请求</nut-button>
		<nut-button type="info" @click="post">发送post请求</nut-button>
		<nut-button type="info" @click="deletefn">发送delete请求</nut-button>
	</div>
</template>

<style lang="scss"></style>
