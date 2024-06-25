import React, { useState } from "react";
import EditorDataPanelToolbar from "./EditorDataPanelToolbar";
import DataViewPanel  from "./DataViewPanel";
import { DataViewMode } from "./DataViewMode";
import { Stack } from "@mui/material";

export default () => {
    const [mode, setMode] = useState<DataViewMode>("table");
    return (
        <Stack
            direction="column"
            sx={{ height: "auto" }}
        >
            <EditorDataPanelToolbar mode={mode} onChange={(event, mode) => setMode(mode)} />
            <DataViewPanel mode={mode} />
        </Stack>
    );
}
