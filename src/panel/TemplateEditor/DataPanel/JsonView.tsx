import React from "react";
import { useTemplate } from "./context";
import * as syphonx from "syphonx-lib";

import {
    TextField,
    Typography
} from "@mui/material";

export default () => {
    const { extractState, refreshing } = useTemplate();

    if (refreshing)
        return <Typography color="primary" fontSize="small">Running...</Typography>;
    else if (extractState?.data)
        return (
            <TextField
                multiline
                fullWidth
                value={extractState && extractState.data ? JSON.stringify(syphonx.unwrap(extractState.data), null, 2) : ""}
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