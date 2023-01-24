import React from "react";
import { Box } from "@mui/material";

export default ({ children }: { children: JSX.Element }) => (
    <Box
        sx={{
            position: "relative",
            backgroundColor: "#ebedf0",
            width: 1,
            height: 1,
            minWidth: 500,
            overflowX: "scroll",
            p: 2
        }}
    >
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            "& .panel": {
                position: "relative",
                overflow: "scroll",
                m: 1,
                p: 1
            }
        }}>
            {children}
        </Box>
    </Box>
);