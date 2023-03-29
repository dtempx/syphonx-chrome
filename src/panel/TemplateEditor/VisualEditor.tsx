import React from "react";
import { Paper, Stack } from "@mui/material";
import { AddActionButton } from "./components";
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
            className="panel"
            elevation={3}
            sx={{
                position: "relative",
                height: 300,
                width: 500
            }}
        >
            <ActionTreeView />
            <AddActionButton
                sx={{
                    position: "absolute",
                    margin: 0,
                    top: "auto",
                    left: "auto",
                    bottom: theme => theme.spacing(1),
                    right: theme => theme.spacing(1)
                }}
            />
        </Paper>

        <Paper
            className="panel"
            elevation={3}
            sx={{
                height: 300,
                width: 1
            }}
        >
            <ActionEditor />
        </Paper>
    </Stack>
);