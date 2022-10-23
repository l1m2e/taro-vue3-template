<script setup>
import { getCurrentInstance, computed } from 'vue'
const props = defineProps({
	label: {
		type: String,
		required: true
	},
	name: {
		type: [String, Number],
		required: true
	}
})

const parentModelValue = computed(() => getCurrentInstance().parent.props.modelValue)
</script>

<template>
	<div v-show="parentModelValue == props.name">
		<slot />
	</div>
</template>
