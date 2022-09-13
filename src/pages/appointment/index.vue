<script lang="ts" setup>
import { reactive } from 'vue'
definePageConfig({
	navigationBarTitleText: '教室借用',
	navigationBarBackgroundColor: '#fafafa'
})
const state = reactive({
	tab11value: '0'
})
</script>

<template>
	<div>
		<nut-tabs v-model="state.tab11value">
			<nut-tabpane title="当天进行">
				<div class="card">
					<div class="title">
						<div>时间:2022-9-08</div>
						<div>未上课</div>
					</div>
					<div></div>
				</div>
			</nut-tabpane>
			<nut-tabpane title="未来进行">
				Tab 2
			</nut-tabpane>
			<nut-tabpane title="历史记录">
				Tab 3
			</nut-tabpane>
		</nut-tabs>
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
