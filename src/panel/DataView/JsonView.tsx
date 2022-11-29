import React from "react";
import { TextField } from "@material-ui/core";
import { useTemplate } from '../TemplateContext';
import { removeDOMRefs } from "../common";

export default () => {
    const { result } = useTemplate();
    return (
        <TextField
            multiline
            fullWidth
            value={result && result.data ? JSON.stringify(removeDOMRefs(result.data), null, 2) : ""}
            variant="outlined"
        />
    );
}