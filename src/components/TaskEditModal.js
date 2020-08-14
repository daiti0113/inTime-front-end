import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    modal: ({modalOpen}) => ({
        opacity: modalOpen ? "initial !important" : 0,
        visibility: modalOpen ? "visible !important" : "hidden"
    }),
    modalBody: () => ({
        top: "50% !important"
    })
})

export const TaskEditModal = ({modalOpen}) => {
    const classes = useStyles({modalOpen})

    return (
        <div className={`modal ${classes.modal}`}>
            <label className="modal-bg" htmlFor="modal-1"></label>
            <div className={`modal-body ${classes.modalBody}`}>
                <label className="btn-close" htmlFor="modal-1">X</label>
                <h4 className="modal-title">Modal Title</h4>
                <h5 className="modal-subtitle">Modal Subtitle</h5>
                <p className="modal-text">This is an example of modal which is implemented with pure CSS! :D</p>
                <label htmlFor="modal-1">Nice!</label>
            </div>
        </div>
    )
}