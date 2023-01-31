import React, { useState } from "react";
import { AppBar, Box, Grid, Tab, Tabs } from "@mui/material";
import JsonView from "./JsonView";
import ResponseView from "./ResponseView";
import TableView from "./TableView";
import { TemplateDataProvider } from "./context";

export default () => {
    const [tab, setTab] = useState(0);
    return (
        <TemplateDataProvider>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="static" color="default" style={{ marginBottom: 12 }}>
                        <Tabs value={tab} onChange={(event, value) => setTab(value)}>
                            <Tab label="RESULTS"></Tab>
                            <Tab label="JSON"></Tab>
                            <Tab label="RESPONSE"></Tab>
                        </Tabs>
                    </AppBar>
                    <Box component="div" display={tab === 0 ? "block" : "none"}>
                        <TableView />
                    </Box>
                    <Box component="div" display={tab === 1 ? "block" : "none"}>
                        <JsonView />
                    </Box>
                    <Box component="div" display={tab === 2 ? "block" : "none"}>
                        <ResponseView />
                    </Box>
                </Grid>
            </Grid>
        </TemplateDataProvider>
    );
}