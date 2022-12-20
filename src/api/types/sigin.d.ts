export interface IgetSignToDay {
	time: number
}
export interface IattendanceRecord {
	classHour?: string
	courseName?: string
	current?: number
	endTime?: number
	size?: number
	startTime?: number
	state?: number | string
}

export interface Iretroactive {
	id: number
	signCause: string
}
