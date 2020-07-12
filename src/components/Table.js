import React, {useState} from "react"

const creatRow = (year, month) => {
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    console.log(startDate, endDayCount)
    
    // eslint-disable-next-line react/jsx-key
    return [...Array(endDayCount)].map((_, i) => <th>{i}</th>)

    // const startDay = startDate.getDay() // 月の最初の日の曜日を取得
}

export const Table = () => {
    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())

    return (
        <table>
            <thead>
                <tr>
                    <th>Task</th>
                    {creatRow(year, month)}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Make a Cake</td>
                </tr>
                <tr>
                    <td>Eat a Cake</td>
                </tr>
            </tbody>
        </table>
    )
}