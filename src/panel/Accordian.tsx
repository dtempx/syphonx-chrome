import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography/*, makeStyles*/ } from "@mui/material";
import * as Icons from "@mui/icons-material";
import ScriptView from "./TemplateView";
import DataView from "./DataView";

/*
const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        //fontWeight: theme.typography.fontWeightRegular
    }
}));
*/

export default () => {
    const [scriptExpanded, setScriptExpanded] = useState(true);
    const [dataExpanded, setDataExpanded] = useState(true);

    //const classes = useStyles();

    return (
        <div /*className={classes.root}*/>
            <Accordion expanded={scriptExpanded} onChange={(event, isExpanded) => setScriptExpanded(isExpanded)}>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="script-content"
                    id="script"
                >
                    <Typography /*className={classes.heading}*/>Template XYZ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ScriptView />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={dataExpanded} onChange={(event, isExpanded) => setDataExpanded(isExpanded)}>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="data-content"
                    id="data"
                >
                    <Typography /*className={classes.heading}*/>Data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DataView />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}