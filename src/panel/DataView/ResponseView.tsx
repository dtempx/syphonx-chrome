import React from "react";
import { TextField } from "@material-ui/core";
import { useTemplate } from '../TemplateContext';

export default () => {
    const { result } = useTemplate();
    const { actions, ...response } = result || {};
    return (
        <TextField
            multiline
            fullWidth
            value={response ? JSON.stringify(response, null, 2) : ""}
            variant="outlined"
        />
    );
}