import React, { useState } from "react";
import SidebarMenu from "./Sidebar/index"
import { useApp, useTemplate } from "./context";
import { Template } from "./lib";

import {
    Box,
    Chip,
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    Code as CodeIcon,
    Category as EditorIcon,
    InsertDriveFileOutlined as FileIcon,
    Menu as MenuIcon,
    MiscellaneousServices as SettingsIcon,
    Biotech as TestIcon
} from "@mui/icons-material";

export default () => {
    const { mode, setMode } = useApp();
    const { template: json, file } = useTemplate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const template = new Template(json);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <Stack direction="row">
                <IconButton size="small" onClick={() => setSidebarOpen(true)}>
                    <MenuIcon fontSize="small" />
                </IconButton>

                {file ? (
                    <Chip
                        label={file}
                        variant="outlined"
                        color="primary"
                        size="small"
                        icon={<FileIcon sx={{ ml: 1 }} />}
                        sx={{ m: 1 }}
                    />
                ) : null}
            </Stack>

            <Stack direction="row" sx={{ mr: 1 }}>
                <Tooltip title="Visual Editor" onClick={() => setMode("visual-editor")}>
                    <IconButton size="small" color={mode === "visual-editor" ? "primary" : "default"}><EditorIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Code Editor" onClick={() => setMode("code-editor")}>
                    <IconButton size="small" color={mode === "code-editor" ? "primary" : "default"}><CodeIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Test Runner" onClick={() => setMode("test-runner")}>
                    <IconButton size="small" color={mode === "test-runner" ? "primary" : "default"}><TestIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Template Settings" onClick={() => setMode("template-settings")}>
                    <IconButton size="small" color={mode === "template-settings" ? "primary" : "default"}><SettingsIcon fontSize="small" /></IconButton>
                </Tooltip>
            </Stack>
        </Box>
    );
};