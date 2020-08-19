import React, {useContext} from "react"
import {Table} from "./Table"
import {TaskProvider} from "../stores/taskStore"
import {TaskAdditionForm} from "./TaskAdditionForm"
import {DisplaySettingProvider} from "../stores/displaySettingStore"
import {userStore} from "../stores/userStore"
import {Login} from "./Login"

export const Top = () => {
    const {state: {user}, dispatch} = useContext(userStore)

    return (
        <div>
            {
                user.loggedIn 
                    ? <TaskProvider>
                        <TaskAdditionForm />
                        <DisplaySettingProvider>
                            <Table />
                        </DisplaySettingProvider>
                    </TaskProvider>
                    : <Login />
            }
        </div>
    )
}