import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";

export default () => {
    const { extract } = useTemplate();
    const { log } = extract || {};
    return (
        <TextField
            multiline
            fullWidth
            value={log}
            variant="outlined"
            size="small"
            InputProps={{
                style: { fontSize: "x-small" }
            }}
        />
    );
}