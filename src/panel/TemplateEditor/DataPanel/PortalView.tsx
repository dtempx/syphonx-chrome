import React from "react";
import { useApp, useTemplate } from "../context";
import { Box, Typography } from "@mui/material";

export default () => {
    const { debug } = useApp();
    const { panelUrl } = useTemplate();

    return (
        <Box>
            <iframe src={panelUrl} width="100%" height="800px" />
            {debug && <Typography variant="caption" fontSize="small">{panelUrl}</Typography>}
        </Box>
    );
}