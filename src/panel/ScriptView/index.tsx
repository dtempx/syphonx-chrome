import React, { useState } from "react";
import { useApp } from "../AppContext";
import { AppBar, Box, Button, Grid, Tab, Tabs, Toolbar } from "@material-ui/core";
import { tryParseJSON } from "../common";
import CodeEditor from "./CodeEditor";
import TreeEditor from "./TreeEditor";

export default () => {
    const { script, setData } = useApp();
    const [tab, setTab] = useState(1);

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
        <Grid container>
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Button variant="contained" color="primary" onClick={() => runScript()}>Run!</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid item xs={12}>
                <AppBar position="static" color="default">
                    <Tabs value={tab} onChange={(event, value) => setTab(value)}>
                        <Tab label="Tree"></Tab>
                        <Tab label="Code"></Tab>
                    </Tabs>
                </AppBar>
                <Box component="div" display={tab === 0 ? "block" : "none"}>
                    <TreeEditor />
                </Box>
                <Box component="div" display={tab === 1 ? "block" : "none"}>
                    <CodeEditor />
                </Box>
            </Grid>
        </Grid>
    );
}