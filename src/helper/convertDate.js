export const getDay = (date) => Number(date.replace(/^.+-/, ""))

export const getTaskDuration = (startDate, endDate) => getDay(endDate) - getDay(startDate) + 1
export const getDateDiff = (srcDate, dstDate) => Math.floor((dstDate.getTime() - srcDate.getTime()) / (1000 * 60 * 60 * 24))