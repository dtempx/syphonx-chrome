import React from "react";
import { useTemplate } from "../context";
import { Paper, TextField } from "@mui/material";
import { Template } from "../../lib";

export default () => {
    const { template: json } = useTemplate();
    const template = new Template(json);

    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <TextField
                variant="outlined"
                size="small"
                multiline
                fullWidth
                value={template.toString("file")}
                sx={{
                    height: "100%",
                    overflow: "scroll"
                }}
            />
        </Paper>
    );
};