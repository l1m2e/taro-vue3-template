<script lang="ts" setup>
const props = defineProps<{
	name: string
	default?: string
}>()
const slotes = useSlots()
let currentTab = ref<string>(props.default || '')

const renderContent = () => {
	return (
		slotes.default &&
		slotes.default().find((item) => {
			if (currentTab.value === '') {
				return true
			}
			return item.props?.name === currentTab.value
		})
	)
}
const renderButton = (name: string, tab: string, index: number) =>
	h(
		'label',
		{
			class: { 'mx-2': true, 'border-b-2': currentTab.value === name || (index === 0 && !currentTab) }
		},
		[
			h(
				'input',
				{
					name: props.name,
					value: name,
					type: 'radio',
					class: 'display-none',
					onclick: () => {
						currentTab.value = name
					}
				},
				{}
			),
			tab
		]
	)

const renderTabBar = () =>
	h(
		'div',
		{
			class: 'flex flex-nowrap overflow-y-scroll'
		},
		slotes.default && slotes.default().map((item, index) => renderButton(item.props?.name, item.props?.tab, index))
	)
</script>

<template>
	<div class="tabs">
		<renderTabBar></renderTabBar>
		<renderContent></renderContent>
	</div>
</template>

<style lang="scss"></style>
