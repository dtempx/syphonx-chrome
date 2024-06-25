import React from "react";
import { useTemplate } from "./context";
import { tryParseJson } from "./lib";

import {
    TextField,
    Typography
} from "@mui/material";

export default () => {
    const { contract, refreshing } = useTemplate();

    if (refreshing)
        return <Typography color="primary" fontSize="small">Running...</Typography>;
    else if (contract)
        return (
            <TextField
                multiline
                fullWidth
                value={contract ? JSON.stringify(tryParseJson(contract), null, 2) : ""}
                variant="standard"
                size="small"
                InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "small" }
                }}
            />
        );
    else
        return <Typography color="primary" fontSize="small">No contract.</Typography>;
}