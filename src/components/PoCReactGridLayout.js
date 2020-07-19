import React from "react"
import GridLayout from "react-grid-layout"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    grid: {
        borderRight: "1px solid"
    },
    gridLayout: {
        border: "1px solid",
        maxHeight: "30px"
    }
})

export const RglPoc = () => {
    const classes = useStyles()

    return (
        <GridLayout className={`layout ${classes.gridLayout}`} cols={31} rowHeight={30} width={620} margin={[0, 0]}>
            <div className={classes.grid} key="a" data-grid={{x: 0, y: 0, w: 1, h: 1, maxH: 1}}>a</div>
            <div className={classes.grid} key="b" data-grid={{x: 1, y: 0, w: 1, h: 1, maxH: 1}}>b</div>
            <div className={classes.grid} key="c" data-grid={{x: 4, y: 0, w: 1, h: 1, maxH: 1}}>c</div>
        </GridLayout>
    )
}