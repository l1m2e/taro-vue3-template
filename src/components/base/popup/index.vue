<script lang="ts" setup>
interface Props {
	modelValue: boolean
	height?: number
}
const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	height: 50
})
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'beforeClose'])
const disabled = ref(true)
const close = () => {
	emits('beforeClose')
	disabled.value = false
	setTimeout(() => {
		emits('update:modelValue', false)
	}, 100)
}
defineExpose({ close })

const ok = () => {
	emits('confirm')
}
const cancel = () => {
	close()
	emits('cancel')
}

watch(
	() => props.modelValue,
	() => {
		disabled.value = props.modelValue
	}
)
const height = computed(() => props.height + 'vh')
</script>

<template>
	<div>
		<div class="mask" v-if="props.modelValue" @click.self="close">
			<div :class="`${disabled ? 'open' : 'close'} popup`">
				<div class="line" @click="close"></div>
				<slot></slot>
				<div class="absolute center w-100% bottom-20px">
					<div class="btn-info mr-20px w-150px h-40px center" @click="cancel">取消</div>
					<div class="btn-success  w-150px h-40px center" @click="ok">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.mask {
	width: 100vw;
	height: 100vh;
	position: fixed;
	background-color: #25252556;
	z-index: 99;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.popup {
	width: 100%;
	height: v-bind(height);
	background-color: white;
	box-sizing: border-box;
	border-radius: 50px 50px 0 0;
	position: absolute;
	overflow: hidden;
	bottom: 0;
	padding: 10px;
	padding-top: 50px;
	.line {
		@include center;
		width: 100%;
		height: 50px;
		position: absolute;
		top: 0;
	}
	.line::after {
		content: '';
		width: 200px;
		height: 10px;
		border-radius: 19px;
		background-color: #636363;
	}
	.line:active {
		background-color: #fafafa;
		.line::after {
			background-color: #2e2e2e;
		}
	}
}

@keyframes Open {
	from {
		transform: translateY(v-bind(height));
	}
	to {
		transform: translateY(0);
	}
}
@keyframes Close {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(v-bind(height));
	}
}
.open {
	animation: Open 0.5s ease-in both;
}
.close {
	animation: Close 0.1s ease-in both;
}
</style>
