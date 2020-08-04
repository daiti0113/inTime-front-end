import React from "react"
import {Table} from "./Table"
import {TaskProvider} from "../stores/taskStore"
import {TaskAdditionForm} from "./TaskAdditionForm"

export const Top = () => {
    return (
        <div>
            <TaskProvider>
                <TaskAdditionForm />
                <Table />
            </TaskProvider>
        </div>
    )
}