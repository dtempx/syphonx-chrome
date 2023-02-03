import React, { useMemo, useState } from "react";
import ErrorView from "./ErrorView";
import JsonView from "./JsonView";
import ResponseView from "./ResponseView";
import TableView from "./TableView";
import { useTemplateData, TemplateDataProvider } from "./context";

import {
    AppBar,
    Box,
    Chip,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography
} from "@mui/material";

export default () => {
    const { result } = useTemplateData();
    const [tab, setTab] = useState(0);
    const errors = useMemo(() => result?.errors ? result.errors.length : 0, [result]);
    return (
        <TemplateDataProvider>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="static" color="default" style={{ marginBottom: 12 }}>
                        <Tabs value={tab} onChange={(event, value) => setTab(value)}>
                            <Tab label="RESULTS" />
                            <Tab label="JSON" />
                            <Tab label="RESPONSE" />
                            <Tab label="ERRORS" />
                            {/*
                            <Tab label={(
                                <Stack direction="row">
                                    <Typography>ERRORS</Typography>
                                    <Chip
                                        label={errors}
                                        color={errors > 0 ? "error" : "default"}
                                        variant={errors > 0 ? "filled" : "outlined"}
                                        size="small"
                                        sx={{ ml: 1 }}
                                    />
                                </Stack>
                            )} />
                            */}
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
                    <Box component="div" display={tab === 3 ? "block" : "none"}>
                        <ErrorView />
                    </Box>
                </Grid>
            </Grid>
        </TemplateDataProvider>
    );
}