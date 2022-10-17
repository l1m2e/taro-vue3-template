<script lang="ts" setup>
interface Item {
	status: number
	openData: string
	closeData: string
	pos: string
	deviceName: string
	name: string
	created_date: string
	reason: string
}
const { item } = defineProps<{
	item: Item
}>()
</script>

<template>
	<div class="info-card">
		<div class="info-card-title" v-if="item.openData">
			<text>时间: {{ item.openData.substring(0, 10) }}</text>
			<text :class="item.status == 5 || item.status == 9 || item.status == 8 ? 'i-c-t-info-out' : 'i-c-t-info'">
				{{
					item.status == 2
						? '审核中'
						: item.status == 3
						? '审核成功'
						: item.status == 4
						? '审核失败'
						: item.status == 5
						? '已过期'
						: item.status == 6
						? '进行中'
						: item.status == 7
						? '未进行'
						: item.status == 8
						? '已完成'
						: item.status == 9
						? '未上课'
						: `查询状态失败 ${item.status}`
				}}
			</text>
		</div>
		<div class="info-card-time">
			<div v-if="item.openData || item.closeData">
				{{ item.openData.substring(10, 16) }} ~
				{{ item.closeData.substring(10, 16) }}
			</div>
		</div>
		<div class="info-card-address">{{ item.pos }} - {{ item.deviceName }}</div>
		<div class="info-card-name">
			<div class="i-c-n-n">
				申请人：
				<div>{{ item.name }}</div>
			</div>
			<text class="i-c-n-time" v-if="item.created_date">于 {{ item.created_date.substring(0, 16) }} 申请</text>
		</div>
		<div class="info-card-history">
			<text>理由: {{ item.reason }}</text>
		</div>
	</div>
</template>

<style lang="scss">
.info-card {
	margin: 30px auto;
	width: 95%;
	height: 240px;
	border-radius: 20px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #ebeef5;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	position: relative;
	.info-card-title {
		font-size: 30px;
		text {
			font-weight: 700;
		}
		display: flex;
		justify-content: space-between;
		align-items: center;
		.i-c-t-info {
			font-weight: 500;
			margin-right: 20px;
			color: black;
		}
		.i-c-t-info-out {
			font-weight: 500;
			margin-right: 20px;
			color: #ccc;
		}
	}
	.info-card-time {
		margin-top: 20px;
		div {
			font-weight: 700;
			font-size: 40px;
		}
	}
	.info-card-address {
		padding-left: 10px;
		position: absolute;
		top: 75px;
		right: 0px;
		width: 340px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		color: #18a058;
		background: rgba(24, 160, 88, 0.16);
		border-radius: 20px 0px 0px 20px;
		@include ellipsis-overflow;
	}
	.info-card-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		.i-c-n-time {
			font-size: 25px;
			color: #ccc;
		}
		.i-c-n-n {
			// background-color: red;
			width: 350px;
			display: flex;
			div {
				width: 150px;
				text-align: center;
				height: 100%;
				border: 1px solid #409eff;
				color: #409eff;
				background: #ecf5ff;
				border-color: #b3d8ff;
				border-radius: 10px;
				@include ellipsis-overflow;
			}
		}
	}
	.info-card-history {
		// position: absolute;
		margin-top: 20px;
		display: flex;
		text {
			width: 100vw;
			@include ellipsis-overflow;
		}
	}
}
</style>
