import React from "react";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import * as Icons from "@mui/icons-material";
import ActionPropertyEditor from "./ActionPropertyEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton";
import DataView from "../DataView";
import { useTemplate } from '../TemplateContext';

export default () => {
    const { template } = useTemplate();

    return (
        <Box
            sx={{
                position: "relative",
                width: 1200,
                height: 400,
                backgroundColor: "#ebedf0",
                p: 2
            }}
        >
            <Stack direction="row" spacing={0}>
                <IconButton size="small">
                    <Icons.AccountTree fontSize="small" />
                </IconButton>
                <IconButton size="small">
                    <Icons.DataObject fontSize="small" />
                </IconButton>
            </Stack>
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
    );
};