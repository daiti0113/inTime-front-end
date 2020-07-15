export const getDay = (date) => Number(date.replace(/^.+-/, ""))

export const getTaskDuration = (startDate, endDate) => getDay(endDate) - getDay(startDate) + 1