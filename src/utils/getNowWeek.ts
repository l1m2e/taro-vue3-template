import dayjs from 'dayjs'
// 这个函数获取当前一周的日期数组
interface IWeekData {
  week: string
  date: string
}
export default function getStartEnd() {
  const arr: IWeekData[] = [
    {
      week: '日',
      date: '',

    },
    {
      week: '一',
      date: ''
    },
    {
      week: '二',
      date: ''
    },
    {
      week: '三',
      date: ''
    }, {
      week: '四',
      date: ''
    }, {
      week: '五',
      date: ''
    }, {
      week: '六',
      date: ''
    },
  ]
  arr.forEach((item, index) => {
    item.date = dayjs().startOf('week').add(index, 'day').format('YYYY-MM-DD')
  })
  return arr
}