//获取当天零点的时间
export const thatDayStart = () => new Date(new Date().setHours(0, 0, 0, 0))
//获取当天23:59:59的时间
export const thatDayEnd = () => new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1)
