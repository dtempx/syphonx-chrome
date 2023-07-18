import React from "react";
import { Box } from "@mui/material";

export default ({ children }: React.PropsWithChildren<{}>) => (
    <Box
        sx={{
            position: "relative",
            backgroundColor: "#ebedf0",
            width: 1,
            height: 1,
            p: 2,
            minWidth: 500
        }}
    >
        <Box sx={{
            display: "flex",
            flexWrap: "wrap"
        }}>
            {children}
        </Box>
    </Box>
);