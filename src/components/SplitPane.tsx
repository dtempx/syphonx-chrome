import React from "react";

import {
    Box,
    SxProps,
    Theme
} from "@mui/material";

interface Props {
    children: React.ReactNode;
    fullWidth?: boolean;
    sx?: SxProps<Theme>;
}

export default ({ children, fullWidth, sx }: Props) => (
    <Box
        sx={{
            ...sx,
            ...(fullWidth ? { width: "100%" } : { width: "auto" }),
            display: "flex",
            justifyContent: "space-between"
        }}
    >
        {children}
    </Box>
);
