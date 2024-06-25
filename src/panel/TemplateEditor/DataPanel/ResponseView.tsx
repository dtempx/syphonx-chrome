import React from "react";
import { useTemplate } from "./context";

import {
    TextField,
    Typography
} from "@mui/material";

export default () => {
    const { extractState, refreshing } = useTemplate();
    const { actions, log, ...response } = extractState || { actions: [], log: "" };

    if (refreshing)
        return <Typography color="primary" fontSize="small">Running...</Typography>;
    else if (response)
        return (
            <TextField
                multiline
                fullWidth
                value={JSON.stringify(response, null, 2)}
                variant="standard"
                size="small"
                InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "small" }
                }}
            />
        );
    else
        return <Typography color="primary" fontSize="small">No data.</Typography>;
}