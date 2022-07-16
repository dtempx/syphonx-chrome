import React from "react";
import { TextField } from "@material-ui/core";
import { useApp } from '../../AppContext';

export default () => {
    const { script, setScript } = useApp();
    return (
        <TextField
            multiline
            fullWidth
            rows={12}
            value={script}
            onChange={event => setScript(event.target.value)}
            variant="outlined"
        />
    );
}