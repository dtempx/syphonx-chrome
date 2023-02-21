import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from "./context";
import { removeDOMRefs } from "./lib";

export default () => {
    const { extract } = useTemplate();
    return (
        <TextField
            multiline
            fullWidth
            value={extract && extract.data ? JSON.stringify(removeDOMRefs(extract.data), null, 2) : ""}
            variant="outlined"
        />
    );
}