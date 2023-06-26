import React from "react";
import { useApp, useTemplate } from "../context";
import { Template } from "../lib";

import {
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    AddCircle as AddIcon
} from "@mui/icons-material";

export default () => {
    const { inspectedWindowUrl } = useApp();
    const { template: json, setTemplate } = useTemplate();

    return (
        <Stack direction="row">
            <Tooltip title="Add url">
                <IconButton
                    size="small"
                    onClick={() => {
                        if (inspectedWindowUrl) {
                            const template = new Template(json);
                            template.addTest({ url: inspectedWindowUrl });
                            setTemplate(template.json());
                        }
                    }}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Stack>
    );
};