import React from "react";
import { TextField } from "@material-ui/core";
import { useApp } from '../AppContext';

export default () => {
    const { data } = useApp();

    return (
        <TextField
            multiline
            fullWidth
            value={data}
            variant="outlined"
        />
    );
}