import React from "react";
import { Paper, Stack } from "@mui/material";
import ActionEditor from "./ActionEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton";

export default () => (
    <Stack
        direction="row"
        sx={{
            width: 1,
            "& > :not(style)": {
                height: 300
            }    
        }}
    >
        <Paper elevation={3} className="panel" sx={{ width: 500 }}>
            <ActionTreeView />
            <AddActionButton
                sx={{
                    position: "absolute",
                    bottom: theme => theme.spacing(2),
                    right: theme => theme.spacing(2)
                }}
            />
        </Paper>
        <Paper elevation={3} className="panel" sx={{ width: 1 }}>
            <ActionEditor />
        </Paper>
    </Stack>
);