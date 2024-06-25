import React from "react";
import { useTemplate } from "./context";

import {
    TextField,
    Typography
} from "@mui/material";

export default () => {
    const { extractState, refreshing } = useTemplate();
    const { log } = extractState || { log: "" };

    if (refreshing)
        return <Typography color="primary" fontSize="small">Running...</Typography>;
    else if (log)
        return (
            <TextField
                multiline
                fullWidth
                value={log}
                variant="standard"
                size="small"
                InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "small" }
                }}
            />
        );
    else
        return <Typography color="primary" fontSize="small">No log.</Typography>;
}