import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, AppBar, Button, Grid, TextField, Toolbar, Typography, makeStyles } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import { tryParseJSON } from "./common";

import { useApp } from './AppContext';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        //fontWeight: theme.typography.fontWeightRegular
    }
}));

export default function () {
    const classes = useStyles();
    const { data, script, setData, setScript } = useApp();

    function runScript() {
        debugger;
        const actions = tryParseJSON(script);
        if (actions) {
            const message = {
                key: "submit",
                script: { actions },
                tabId: chrome.devtools.inspectedWindow.tabId
            };
            chrome.runtime.sendMessage(message, response => {
                if (response) {
                    setData(JSON.stringify(response.result, null, 2));
                    //elements.status.innerText = response.status;
                    //elements.output.innerText = JSON.stringify(response.result, null, 2);
                }
            });
            //elements.status.innerText = "EXECUTING";
        }
        else {
            setData("INVALID");
            //elements.output.innerText = "INVALID";
        }
    }

    return (
        <div className={classes.root}>
            <Accordion expanded>
                <AccordionSummary
                    expandIcon={<Icons.ExpandMore />}
                    aria-controls="script-content"
                    id="script"
                >
                    <Typography className={classes.heading}>Script</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Button variant="contained" color="primary" onClick={() => runScript()}>Run</Button>
                                </Toolbar>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                multiline
                                fullWidth
                                rows={20}
                                value={script}
                                onChange={event => setScript(event.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
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
                    <TextField
                        multiline
                        fullWidth
                        value={data}
                        variant="outlined"
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}