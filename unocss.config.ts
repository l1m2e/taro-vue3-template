import { defineConfig, presetAttributify } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig({
	shortcuts: [
		['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
		['cell', 'w-100% h-50px bg-white flex  px-10px leading-50px justify-between box-border border-b-1 border-b-gray100']
	],
	presets: [
		presetAttributify(),
		presetIcons({
			scale: 1.2,
			warn: true,
			collections: {
				ri: () => import('@iconify-json/ri/icons.json').then((i) => i.default)
			}
		}),
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
