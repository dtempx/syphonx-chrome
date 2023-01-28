import React from "react";
import { Box } from "@mui/material";
import DebugView from "./DebugView";

export default ({ children }: { children: JSX.Element | null }) => (
    <Box>
        {children}
        <DebugView />
    </Box>
);