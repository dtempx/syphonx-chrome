import React from "react";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import * as Icons from "@mui/icons-material";
import ActionPropertyEditor from "./ActionPropertyEditor/index";
import ActionTreeView from "./ActionTreeView/index";
import AddActionButton from "./AddActionButton";
import { useTemplate } from '../TemplateContext/index';

export default () => {
    const { template, selected } = useTemplate();
    const selectedItem = template?.findItem(selected);

    return (
        <Box
            sx={{
                position: "relative",
                width: 800,
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
                    <ActionTreeView items={template?.actions} />
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
                    sx={{ width: 400 }}
                >
                    <ActionPropertyEditor item={selectedItem} />
                </Paper>
            </Box>
        </Box>
    );
};