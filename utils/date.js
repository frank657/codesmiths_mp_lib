const getToday = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const timeUIFormatter = (start, end) => {
  const tot = todayOrTomorrow(start.raw);
  const dateString = tot ? tot : `${start.day}, ${start.date} ${start.month}`;
  console.log('app language', getApp().globalData.lang == 'cn')
  // const until = getApp().globalData.lang == 'cn'
  if (day(start) == day(end)) {
    return [ dateString, `${start.time} - ${end.time}` ]
  } else {
    return [ `${dateString}, ${start.time} until`, `${end.day}, ${end.date} ${end.month}, ${end.time}` ]
  }
}

const todayOrTomorrow = (date) => {
  date = new Date(date)
  const today = new Date()
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  if (date.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
    return 'Today'
  } else if (date.setHours(0,0,0,0) == tomorrow.setHours(0,0,0,0)) {
    return 'Tomorrow'
  } else {
    return false
  }
}
// const months=()=>['January','February','March','April','May','June','July','August','September','October','November','December']
// const days=()=>['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const day = (time) => {
  return time.date + time.month + time.year
}

module.exports = {
  formatTime, 
  getToday, 
  timeUIFormatter
}