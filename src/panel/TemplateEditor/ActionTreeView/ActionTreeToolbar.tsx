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
    GpsFixed as HotTrackingIcon
} from "@mui/icons-material";

import {
    SplitPane
} from "./components";

export default () => {
    const { hotTracking, setHotTracking } = useApp();
    return (
        <SplitPane sx={{ p: 1, mb: 1, backgroundColor: "#f5f5f5" }}>
            <AddButton />
            <Stack direction="row" spacing={1}>
                <Tooltip title="Enable or disable hot-tracking mode which scrolls the target element into view on the page when hovering over the tree view.">
                    <IconButton
                        size="small"
                        color={hotTracking ? "primary" : "default"}
                        onClick={() => {
                            setHotTracking(!hotTracking);
                            unhiliteAll();
                        }}
                    >
                        <HotTrackingIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </SplitPane>
    );
};
