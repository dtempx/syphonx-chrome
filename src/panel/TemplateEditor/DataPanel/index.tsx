import React, { useState } from "react";
import ContractView from "./ContractView";
import ErrorView from "./ErrorView";
import JsonView from "./JsonView";
import LogView from "./LogView";
import PortalView from "./PortalView";
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
        <Stack
            direction="column"
            sx={{
                height: "auto"
            }}
        >
            <Toolbar mode={mode} onChange={(event, mode) => setMode(mode)} />
            <Box
                sx={{
                    height: "auto",
                    minHeight: 365,
                    overflow: "auto",
                    m: 1
                }}
            >
                <Box component="div" display={mode === "table" ? "block" : "none"}>
                    <TableView />
                </Box>
                <Box component="div" display={mode === "json" ? "block" : "none"}>
                    <JsonView />
                </Box>
                <Box component="div" display={mode === "contract" ? "block" : "none"}>
                    <ContractView />
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
                <Box component="div" display={mode === "portal" ? "block" : "none"}>
                    <PortalView />
                </Box>
            </Box>
        </Stack>
    );
}