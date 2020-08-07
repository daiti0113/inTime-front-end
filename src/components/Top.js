import React from "react"
import {Table} from "./Table"
import {TaskProvider} from "../stores/taskStore"
import {TaskAdditionForm} from "./TaskAdditionForm"
import {DisplaySettingProvider} from "../stores/displaySettingStore"

export const Top = () => {
    return (
        <div>
            <TaskProvider>
                <TaskAdditionForm />
                <DisplaySettingProvider>
                    <Table />
                </DisplaySettingProvider>
            </TaskProvider>
        </div>
    )
}