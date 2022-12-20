import React, { useState } from "react";
import { Box, Chip, FormControlLabel, FormGroup, IconButton, Paper, Stack, Switch } from "@mui/material";
import { Menu as MenuIcon, InsertDriveFileOutlined as FileIcon } from "@mui/icons-material";
import ActionPropertyEditor from "./ActionPropertyEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton";
import DataView from "./DataView";
import SidebarMenu from "./SidebarMenu"
import { useTemplate } from '../context';

export default () => {
    const { template, advanced, setAdvanced } = useTemplate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (<>
        <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Stack direction="row" spacing={0}>
            <IconButton size="small" onClick={() => setSidebarOpen(true)}>
                <MenuIcon fontSize="small" />
            </IconButton>
        </Stack>

        <Box
            sx={{
                position: "relative",
                backgroundColor: "#ebedf0",
                width: 1,
                height: 1,
                p: 2
            }}
        >
            <Box visibility={template.file ? "visible" : "hidden"}>
                <Chip
                    label={template.file}
                    variant="filled"
                    color="default"
                    size="small"
                    icon={<FileIcon />}
                    sx={{ ml: 1 }}
                />
            </Box>

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
                        <ActionPropertyEditor item={template.selectedItem()} />
                    </Paper>
                </Stack>
                <Paper elevation={3} className="panel" sx={{ width: 1 }}>
                    <DataView />
                </Paper>
            </Box>
            
        </Box>
    </>);
};