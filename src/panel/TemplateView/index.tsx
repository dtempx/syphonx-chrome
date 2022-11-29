import React, { useState } from "react";
import { AppBar, Box, Grid, Tab, Tabs } from "@mui/material";
import CodeEditor from "./CodeEditor";
import TreeEditor from "./TreeEditor";

export default () => {
    const [tab, setTab] = useState(1);

    return (
        <Grid container>
            {/*
            <Grid item xs={12}>
                <AppBar position="static">
                    <Toolbar>
                        <Button variant="contained" color="primary" onClick={runScript}>Run!</Button>
                    </Toolbar>
                </AppBar>
            </Grid>
            */}
            <Grid item xs={12}>
                <AppBar position="static" color="default" style={{ marginBottom: 12 }}>
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