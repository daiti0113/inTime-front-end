import React from "react"
import {createUseStyles} from "react-jss"
import {Link} from "react-router-dom"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridTemplateColumns: "auto 30%",
        alignItems: "center",
        "& a": {
            borderBottom: "none"
        },
        "& a:hover": {
            borderBottom: "none"
        }
    },
    links:{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        justifyItems: "end",
        alignItems: "center",
        columnGap: "10px"
    },
    logo: {
        fontSize: "30px",
        padding: "0 0 0 10",
        cursor: "pointer"
    }
})

export const Header = () => {
    const classes = useStyles()

    return (
        <nav className={`border ${classes.container}`}>
            <Link to="/login" className={classes.logo}>inTime</Link>
            <div className={classes.links}>
                <Link to="/#">Settings</Link>
                <Link to="/login">Logout</Link>
            </div>
        </nav>
    )
}