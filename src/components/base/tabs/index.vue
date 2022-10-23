<script setup>
import { defineComponent, reactive, toRefs, ref, computed, watch, toRef, useSlots } from 'vue'

const props = defineProps({
	modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue', 'click'])

const slots = useSlots()

const tabList = computed(() => {
	if (!slots.default) return []
	return slots.default().map((item) => ({
		name: item.props.name,
		label: item.props.label
	}))
})

const modelValue = toRef(props, 'modelValue')

function handleClick(name) {
	// 触发父组件更行value
	emit('update:modelValue', name)

	// 触发父组件上的点击事件。 传入name
	emit('click', name)
}
</script>

<template>
	<div>
		<ul class="title-wrap">
			<li v-for="item in tabList" :key="item" :class="{ active: modelValue == item.name }" @click.stop="handleClick(item.name)">{{ item.label }}</li>
		</ul>

		<div class="content-wrap">
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
.title-wrap {
	padding: 0;
	margin: 0 auto;
	list-style: none;
	display: flex;
	flex-direction: row;
	& > li {
		min-width: 40px;
		padding: 8px;
		margin: 0 10px 0 0;
		border: 1px solid #666;
		&:last-child {
			margin: 0;
		}
		&.active {
			border: 1px solid rgba(12, 143, 230, 0.856);
			color: rgba(12, 143, 230, 0.856);
		}
	}
}
</style>
