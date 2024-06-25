import React, { useState } from "react";
import DataViewButtonRibbon from "./DataViewButtonRibbon";
import DataViewPanel from "./DataViewPanel";
import RunStatusRibbon from "./RunStatusRibbon";
import { DataViewMode } from "./DataViewMode";
import { Stack } from "@mui/material";

export default () => {
    const [mode, setMode] = useState<DataViewMode>("table");
    return (
        <Stack
            direction="column"
            sx={{ height: "auto" }}
        >
            <Stack direction="row">
                <DataViewButtonRibbon mode={mode} onChange={(event, mode) => setMode(mode)} />
                <RunStatusRibbon />
            </Stack>
            <DataViewPanel mode={mode} />
        </Stack>
    );
}
