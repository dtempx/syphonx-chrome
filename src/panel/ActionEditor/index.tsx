import React, { useState } from "react";
import { Box, FormControlLabel, FormGroup, IconButton, Paper, Stack, Switch } from "@mui/material";
import * as Icons from "@mui/icons-material";
import ActionPropertyEditor from "./ActionPropertyEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton";
import DataView from "./DataView";
import SidebarMenu from "./SidebarMenu"
import { useTemplate } from '../TemplateContext';

export default () => {
    const { template, advanced, setAdvanced } = useTemplate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (<>
        <SidebarMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Stack direction="row" spacing={0}>
            <IconButton size="small" onClick={() => setSidebarOpen(true)}>
                <Icons.Menu fontSize="small" />
            </IconButton>
        </Stack>
        <Box
            sx={{
                position: "relative",
                width: 1200,
                height: 400,
                backgroundColor: "#ebedf0",
                p: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        overflow: "scroll",
                        position: "relative",
                        height: 300,
                        m: 1,
                        p: 1
                    }
                }}
            >
                <Paper
                    elevation={3}
                    sx={{ width: 300 }}
                >
                    <ActionTreeView />
                    <AddActionButton
                        sx={{
                            position: "absolute",
                            bottom: theme => theme.spacing(2),
                            right: theme => theme.spacing(2)
                        }}
                    />
                </Paper>
                <Paper
                    elevation={3}
                    sx={{ width: 300 }}
                >
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
                <Paper
                    elevation={3}
                    sx={{ width: 500 }}
                >
                    <DataView />
                </Paper>
            </Box>
            
        </Box>
    </>);
};