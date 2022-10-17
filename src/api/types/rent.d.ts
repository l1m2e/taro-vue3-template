export interface IGetCourseList {
	parameter: string
	time: string
}
export interface IAddRentClassroom {
	startTime: number
	endTime: number
	classPostion: string
	deviceName: string
	classMAC: string
	reason: string
}

export interface IRentList {
	action: number
	timeType: string
	indexStart: number
	indexEnd: number
}
