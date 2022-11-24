import { baseUrl } from '@/config/baseUrl'

export const Svg = reactive({
	noNetwork: `${baseUrl.value}/applet/image/noNetwork.svg`, // 没有网络
	error: `${baseUrl.value}/applet/image/error.svg`, // 错误
	noData: `${baseUrl.value}/applet/image/noData.svg`, // 没有数据
	noCourse: `${baseUrl.value}/applet/image/noCourse.svg`, // 没有课程
	signIn: `${baseUrl.value}/applet/image/sign-in.svg`, // 签到
	logo: `${baseUrl.value}/applet/image/logo.svg`, // 小程序图标
	state403: `${baseUrl.value}/applet/image/403.svg`, //403 无权访问
	baseAvatar: `${baseUrl.value}/applet/image/avatar/male.svg`,
	noLogin: `${baseUrl.value}/applet/image/noLogin.svg`
})

watch(
	() => baseUrl.value,
	(v: string) => {
		Object.keys(Svg).forEach((key: string) => {
			Svg[key] = v + splitText(Svg[key])
		})
	}
)

const splitText = (text: string) => text.substring(text.indexOf('/applet'), text.length)
