import React, { useState } from "react";
import SidebarMenu from "./Sidebar/index"
import { useApp, useTemplate } from "./context";
import { SplitPane } from "./components";
import { path } from "./lib";

import {
    Chip,
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    Code as CodeIcon,
    AccountTree as EditorIcon,
    InsertDriveFileOutlined as FileIcon,
    Menu as MenuIcon,
    MiscellaneousServices as SettingsIcon,
    Science as TestIcon
} from "@mui/icons-material";

export default () => {
    const { mode, setMode } = useApp();
    const { templateFile } = useTemplate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <SplitPane>
            <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <Stack direction="row">
                <IconButton size="small" onClick={() => setSidebarOpen(true)}>
                    <MenuIcon />
                </IconButton>

                {templateFile ? (
                    <Tooltip title={templateFile}>
                        <Chip
                            label={path.shorten(templateFile, 60)}
                            variant="outlined"
                            color="primary"
                            size="small"
                            icon={<FileIcon sx={{ ml: 1 }} />}
                            sx={{ m: 1 }}
                        />
                    </Tooltip>
                ) : null}
            </Stack>

            <Stack direction="row" sx={{ mr: 1 }}>
                <Tooltip title="Visual Editor" onClick={() => setMode("visual-editor")}>
                    <IconButton size="small" color={mode === "visual-editor" ? "primary" : "default"}><EditorIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Code Editor" onClick={() => setMode("code-editor")}>
                    <IconButton size="small" color={mode === "code-editor" ? "primary" : "default"}><CodeIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Test Runner" onClick={() => setMode("test-runner")}>
                    <IconButton size="small" color={mode === "test-runner" ? "primary" : "default"}><TestIcon /></IconButton>
                </Tooltip>
                <Tooltip title="Template Settings" onClick={() => setMode("template-settings")}>
                    <IconButton size="small" color={mode === "template-settings" ? "primary" : "default"}><SettingsIcon /></IconButton>
                </Tooltip>
            </Stack>
        </SplitPane>
    );
};