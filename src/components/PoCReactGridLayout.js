import React from "react"
import GridLayout from "react-grid-layout"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    grid: {
        border: "1px solid"
    }
})

export const RglPoc = () => {
    const classes = useStyles()

    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
            <div className={classes.grid} key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
            <div className={classes.grid} key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
            <div className={classes.grid} key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
        </GridLayout>
    )
}