import React, { useState } from "react";
import ErrorView from "./ErrorView";
import JsonView from "./JsonView";
import LogView from "./LogView";
import ResponseView from "./ResponseView";
import TableView from "./TableView";
import Toolbar, { DataViewMode } from "./Toolbar";

import {
    Box,
    Stack
} from "@mui/material";

export default () => {
    const [mode, setMode] = useState<DataViewMode>("table");
    return (
        <Stack direction="column">
            <Toolbar mode={mode} onChange={(event, mode) => setMode(mode)} />
            <Box component="div" display={mode === "table" ? "block" : "none"}>
                <TableView />
            </Box>
            <Box component="div" display={mode === "json" ? "block" : "none"}>
                <JsonView />
            </Box>
            <Box component="div" display={mode === "log" ? "block" : "none"}>
                <LogView />
            </Box>
            <Box component="div" display={mode === "raw" ? "block" : "none"}>
                <ResponseView />
            </Box>
            <Box component="div" display={mode === "errors" ? "block" : "none"}>
                <ErrorView />
            </Box>
        </Stack>
);
}