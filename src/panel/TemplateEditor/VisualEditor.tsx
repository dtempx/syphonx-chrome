import React from "react";
import { Paper, Stack } from "@mui/material";
import ActionEditor from "./ActionEditor";
import ActionTreeView from "./ActionTreeView";

export default () => (
    <Stack
        direction="row"
        sx={{
            width: 1
        }}
    >
        <Paper
            elevation={3}
            sx={{
                position: "relative",
                height: 300,
                width: 500,
                m: 1,
                p: 1
            }}
        >
            <ActionTreeView />
        </Paper>

        <Paper
            elevation={3}
            sx={{
                height: 300,
                width: 1,
                m: 1,
                p: 1,
                overflowY: "auto"
            }}
        >
            <ActionEditor />
        </Paper>
    </Stack>
);