import React from "react";
import { Box } from "@mui/material";
import DebugView from "./DebugView";

export default ({ children }: React.PropsWithChildren<{}>) => (
    <Box>
        {children}
        <DebugView />
    </Box>
);