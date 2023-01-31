import React from "react";
import { TextField } from "@mui/material";
import { useTemplateData } from "./context";
import { removeDOMRefs } from "../lib";

export default () => {
    const { result } = useTemplateData();
    return (
        <TextField
            multiline
            fullWidth
            value={result && result.data ? JSON.stringify(removeDOMRefs(result.data), null, 2) : ""}
            variant="outlined"
        />
    );
}