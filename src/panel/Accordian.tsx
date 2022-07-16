import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, makeStyles } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import ScriptView from "./ScriptView";
import DataView from "./DataView";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        //fontWeight: theme.typography.fontWeightRegular
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="script-content"
                    id="script"
                >
                    <Typography className={classes.heading}>Script</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ScriptView />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="data-content"
                    id="data"
                >
                    <Typography className={classes.heading}>Data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DataView />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}