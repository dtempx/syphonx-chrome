import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";
import * as syphonx from "syphonx-lib";

export default () => {
    const { extract } = useTemplate();
    return (
        <TextField
            multiline
            fullWidth
            value={extract && extract.data ? JSON.stringify(syphonx.unwrap(extract.data), null, 2) : ""}
            variant="standard"
            size="small"
            InputProps={{
                disableUnderline: true,
                style: { fontSize: "small" }
            }}
        />
    );
}