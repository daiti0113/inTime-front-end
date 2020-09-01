import React, {useContext} from "react"
import {createUseStyles} from "react-jss"
import {deleteData} from "../helper/handleData"
import {taskStore} from "../stores/taskStore"
import {userStore} from "../stores/userStore"
import {useSomeContexts} from "../helper/useSomeHooks"

const useStyles = createUseStyles({
    modal: ({modalOpen}) => ({
        opacity: modalOpen ? "initial !important" : 0,
        visibility: modalOpen ? "visible !important" : "hidden"
    }),
    modalBody: () => ({
        top: "50% !important"
    })
})

export const TaskEditModal = ({modalOpen, setModalOpen, task}) => {
    const classes = useStyles({modalOpen})
    const [{dispatch}, {state: {user}}] = useSomeContexts(useContext, [taskStore, userStore])

    return (
        <div className={`modal ${classes.modal}`}>
            <label className="modal-bg" htmlFor="modal-1"></label>
            <div className={`modal-body ${classes.modalBody}`}>
                <label className="btn-close" htmlFor="modal-1" onClick={() => setModalOpen(false)}>X</label>
                <h4 className="modal-title">{task.taskName}</h4>
                <label htmlFor="modal-1" onClick={() => deleteData("tasks", dispatch, {id: task.id, uid: user.uid})}>Delete</label>
            </div>
        </div>
    )
}