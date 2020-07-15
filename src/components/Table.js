import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"

const createRow = (year, month) => {
    const startDate = new Date(year, month, 1) // 月の最初の日を取得
    const endDate = new Date(year, month + 1,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    console.log(startDate, endDate, endDayCount)
    
    // eslint-disable-next-line react/jsx-key
    return [...Array(endDayCount)].map((_, i) => <th>{i+1}</th>)
}

const TableHeader = ({year, month}) => {
    return (
        <thead>
            <tr>
                <th>Task</th>
                {createRow(year, month)}
            </tr>
        </thead>
    )
}

export const Table = () => {
    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())
    const [tasks, setTasks] = useState([])

    fetchData(useEffect, "/tasks", setTasks)

    return (
        <table>
            <TableHeader year={year} month={month} />
            <tbody>
                {console.log(tasks)}
            </tbody>
        </table>
    )
}