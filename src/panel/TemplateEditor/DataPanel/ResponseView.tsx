import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";

export default () => {
    const { extract } = useTemplate();
    const { actions, log, ...response } = extract || { actions: [], log: "" };
    return (
        <TextField
            multiline
            fullWidth
            value={response ? JSON.stringify(response, null, 2) : ""}
            variant="standard"
            size="small"
            InputProps={{
                disableUnderline: true,
                style: { fontSize: "small" }
            }}
        />
    );
}