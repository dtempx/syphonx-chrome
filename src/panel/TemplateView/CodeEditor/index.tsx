import React from "react";
import { TextField } from "@material-ui/core";
import { useScript } from '../../ScriptContext';

export default () => {
    const { text, setText } = useScript();
    return (
        <TextField
            multiline
            fullWidth
            rows={12}
            value={text}
            onChange={event => setText(event.target.value)}
            variant="outlined"
        />
    );
}