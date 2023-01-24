import React from "react";
import { useTemplate } from "../context";
import { Paper, TextField } from "@mui/material";

export default () => {
    const { template } = useTemplate();

    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <TextField
                variant="outlined"
                size="small"
                multiline
                fullWidth
                value={template}
                sx={{ height: "100%" }}
            />
        </Paper>
    );
};