import React from "react";
import { useApp } from "./context";
import AddButton from "./AddButton";
import { unhiliteAll } from "./lib";

import {
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    GpsFixed as TrackingIcon
} from "@mui/icons-material";

import {
    SplitPane
} from "./components";

export default () => {
    const { editTracking, setEditTracking } = useApp();
    return (
        <SplitPane sx={{ p: 1, mb: 1, backgroundColor: "#f5f5f5" }}>
            <AddButton />
            <Stack direction="row" spacing={1}>
                <Tooltip title="Enable or disable hot-tracking mode which scrolls the target element into view on the page when hovering over the tree view.">
                    <IconButton
                        size="small"
                        color={editTracking ? "primary" : "default"}
                        onClick={() => {
                            setEditTracking(!editTracking);
                            unhiliteAll();
                        }}
                    >
                        <TrackingIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </SplitPane>
    );
};
