import React, { useMemo } from "react";
import { useTemplate } from "../context";
import { Paper, TextField } from "@mui/material";
import { Template } from "../../lib";

export default () => {
    const { template: json } = useTemplate();

    const { code } = useMemo(() => {
        debugger;
        const template = new Template(json);
        const code = template.toString("file");
        return { template, code };
    }, [json]);

    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <TextField
                variant="outlined"
                size="small"
                multiline
                fullWidth
                value={code}
                sx={{ height: "100%", overflow: "scroll" }}
            />
        </Paper>
    );
};