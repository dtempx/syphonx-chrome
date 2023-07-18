import React from "react";
import { TextField, Typography } from "@mui/material";
import { useTemplate } from "./context";
import { tryParseJson } from "./lib";

export default () => {
    const { contract } = useTemplate();
    if (contract)
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
        return <Typography fontSize="small">No data contract.</Typography>
}