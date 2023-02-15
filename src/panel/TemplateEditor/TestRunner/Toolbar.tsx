import React from "react";
import { useTemplate } from "../context";
import { background, Template } from "../lib";

import {
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    Add as AddIcon
} from "@mui/icons-material";

export default () => {
    const { template: json, setTemplate } = useTemplate();

    async function onAdd() {
        const template = new Template(json);
        const tab = await background.inspectedWindow.activeTab();
        if (tab.url) {
            template.addTest({ url: tab.url });
            setTemplate(template.json());
        }
    }

    return (
        <Stack direction="row">
            <Tooltip title="Add url">
                <IconButton size="small" onClick={onAdd}><AddIcon fontSize="small" /></IconButton>
            </Tooltip>
        </Stack>
    );
};