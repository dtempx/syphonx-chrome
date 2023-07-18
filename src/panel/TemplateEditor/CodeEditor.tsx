import React, { useMemo } from "react";
import { Paper, TextField } from "@mui/material";
import { useTemplate } from "./context";
import { Template } from "./lib";

export default () => {
    const { template: json } = useTemplate();

    const { code } = useMemo(() => {
        const template = new Template(json);
        const code = template.file();
        return { template, code };
    }, [json]);

    return (
        <Paper
            elevation={3}
            sx={{
                width: 1,
                height: 300,
                m: 1,
                p: 1
            }}
        >
            <TextField
                variant="standard"
                size="small"
                multiline
                fullWidth
                value={code}
                sx={{
                    height: "100%",
                    overflow: "auto"
                }}
                InputProps={{
                    disableUnderline: true
                }}
            />
        </Paper>
    );
};