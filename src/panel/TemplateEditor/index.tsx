import React, { useState } from "react";
import ActionEditor from "./ActionEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton/index";
import DataView from "./DataView";
import SidebarMenu from "./Sidebar/index"
import { useTemplate, TemplateProvider } from "../context";
import { Template } from "../../lib";

import {
    Box,
    Chip,
    FormControlLabel,
    FormGroup,
    IconButton,
    Paper,
    Stack,
    Switch,
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
    const { template: obj, advanced, setAdvanced } = useTemplate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const template = new Template(obj);
    const file = template.file();

    return (
        <TemplateProvider>
            <Box sx={{ minWidth: 500 }}>
                <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                        <Tooltip title="Visual Editor">
                            <IconButton size="small" color="primary"><EditorIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Code Editor">
                            <IconButton size="small"><CodeIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Test Runner">
                            <IconButton size="small"><TestIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Template Settings">
                            <IconButton size="small"><SettingsIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        backgroundColor: "#ebedf0",
                        width: 1,
                        height: 1,
                        minWidth: 500,
                        overflowX: "scroll",
                        p: 2
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        "& .panel": {
                            position: "relative",
                            overflow: "scroll",
                            m: 1,
                            p: 1
                        }
                    }}>
                        <Stack
                            direction="row"
                            sx={{
                                width: 1,
                                "& > :not(style)": {
                                    height: 300
                                }    
                            }}
                        >
                            <Paper elevation={3} className="panel" sx={{ width: 400 }}>
                                <ActionTreeView />
                                <AddActionButton
                                    sx={{
                                        position: "absolute",
                                        bottom: theme => theme.spacing(2),
                                        right: theme => theme.spacing(2)
                                    }}
                                />
                            </Paper>
                            <Paper elevation={3} className="panel" sx={{ width: 1 }}>
                                <Stack direction="row" spacing={0} justifyContent="end">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch checked={advanced} onChange={event => setAdvanced(event.target.checked)} />}
                                            label="Advanced"
                                        />
                                    </FormGroup>                        
                                </Stack>
                                <ActionEditor />
                            </Paper>
                        </Stack>
                        <Paper elevation={3} className="panel" sx={{ width: 1 }}>
                            <DataView />
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </TemplateProvider>
    );
};