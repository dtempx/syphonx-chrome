import React from "react";
import { TextField } from "@material-ui/core";
import { useScript } from '../ScriptContext';

export default () => {
    const { result } = useScript();
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