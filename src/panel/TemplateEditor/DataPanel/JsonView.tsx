import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";
import * as syphonx from "syphonx-lib";

export default () => {
    const { extractState } = useTemplate();
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
}