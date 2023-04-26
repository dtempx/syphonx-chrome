import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";
import { tryParseJson } from "./lib";

export default () => {
    const { contract } = useTemplate();
    return (
        <TextField
            multiline
            fullWidth
            value={contract ? JSON.stringify(tryParseJson(contract), null, 2) : ""}
            variant="outlined"
            size="small"
            InputProps={{
                style: { fontSize: "x-small" }
            }}
        />
    );
}