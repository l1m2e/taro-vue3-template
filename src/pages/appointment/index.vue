<script lang="ts" setup>
definePageConfig({
	navigationBarTitleText: '教室借用',
	navigationBarBackgroundColor: '#fafafa'
})

</script>

<template>
	<div>
		<!-- <div class="card">
					<div class="title">
						<div>时间:2022-9-08</div>
						<div>未上课</div>
					</div>
					<div></div>
				</div> -->
	</div>
</template>

<style lang="scss">
.nut-tabs__titles,
.nut-tabpane {
	background-color: #fafafa;
}

.card {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 220px;
	margin-top: 20px;
	padding: 10px;
	border-radius: 20px;
	background-color: white;
	box-shadow: 0 0 20px #e9e8e8;
	.title {
		display: flex;
		justify-content: space-between;
		div:nth-child(1) {
			font-size: 30px;
			font-weight: 700;
		}
		div:nth-child(2) {
			font-size: 30px;
			color: #ccc;
			margin-right: 20px;
		}
	}
}
</style>
