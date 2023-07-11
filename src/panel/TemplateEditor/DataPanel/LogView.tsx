import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";

export default () => {
    const { extract } = useTemplate();
    const { log } = extract || { log: ""};
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
}