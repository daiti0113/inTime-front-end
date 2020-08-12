export const getDay = date => Number(date.replace(/^.+-/, ""))
export const getTaskDuration = (startDate, endDate) => getDay(endDate) - getDay(startDate) + 1
export const getDateDiff = (srcDate, dstDate) => Math.ceil((dstDate.getTime() - srcDate.getTime()) / (1000 * 60 * 60 * 24))
export const formatDate = date => {
    const pre =  typeof date === "string" ? new Date(date) : date
    return `${pre.getFullYear()}-${(pre.getMonth()+1).toString().padStart(2, "0")}-${pre.getDate().toString().padStart(2, "0")}T09:00:00+09:00`
}