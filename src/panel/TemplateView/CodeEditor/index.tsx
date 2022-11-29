import React from "react";
import { TextField } from "@mui/material";
import { useTemplate } from '../../TemplateContext';

export default () => {
    const { text, setText } = useTemplate();
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