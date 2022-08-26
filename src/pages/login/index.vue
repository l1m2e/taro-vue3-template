<script lang="ts" setup>
definePageConfig({
	navigationBarTitleText: '授权'
})
</script>

<template>
	<div>
		<div class="icon"><image class="icon-img" src="../../assets/tab-bar/home-active.png" /></div>
		<div>
			<p class="h1">hello，欢迎使用莱拓智能</p>
			<p class="h1">莱托智能需要你的授权</p>
			<p class="h2">莱拓智能不会将你的信息提供给第三方</p>
		</div>
		<div class="button">
			<nut-button block type="info" size="large">授权</nut-button>
		</div>
	</div>
</template>

<style lang="scss">
.h1 {
	font-size: 40px;
	font-weight: 700;
	text-align: center;
	margin-top: 30px;
}
.h2 {
	font-size: 30px;
	color: #c6c8ce;
	text-align: center;
	margin-top: 100px;
}
.icon {
	width: 100%;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon-img {
	width: 200px;
	height: 200px;
	border-radius: 100%;
}
.button {
	width: 80%;
	margin: 0 auto;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
