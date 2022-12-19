import { defineConfig, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig({
	shortcuts: [
		['btn-success', 'px-5 py-2 rounded inline-block bg-teal-500 text-white box-border active:bg-teal-700'],
		['btn-info', 'px-5 py-2 rounded inline-block bg-[#f2f3f5]  color-gray-5 tracking-widest  box-border active:bg-[#e5e6eb]'],
		['cell', 'w-100% h-50px bg-white flex  px-10px leading-50px justify-between box-border border-b-1 border-b-gray100'],
		['center', 'flex items-center justify-center']
	],
	presets: [
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
			collections: {
				ri: () => import('@iconify-json/ri/icons.json').then((i) => i.default)
			},
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle'
			}
		}) as any,
		presetWeapp({
			isH5: process.env.TARO_ENV === 'h5',
			platform: 'taro',
			taroWebpack: 'webpack5',
			designWidth: 375,
			deviceRatio: {
				640: 2.34 / 2,
				750: 1,
				828: 1.81 / 2,
				375: 2 / 1
			}
		})
	]
})
