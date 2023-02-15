import React, { useMemo } from "react";
import { useTemplate } from "../context";
import { background, Template } from "../lib";

import {
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    SxProps,
    Theme,
    Tooltip
} from "@mui/material";

import {
    Delete as DeleteIcon,
    Launch as OpenIcon
} from "@mui/icons-material";

export interface Props {
    sx?: SxProps<Theme>;
}

export default ({ sx }: Props) => {
    const { template: json } = useTemplate();

    const tests = useMemo(() => {
        const template = new Template(json);
        return template.tests();        
    }, [json]);

    return (
        <List dense sx={sx}>
            {tests.map(test => test.url).map(url => (
                <ListItem
                    key={url}
                    dense
                    secondaryAction={
                        <Stack direction="row">
                            <IconButton size="small" onClick={() => {
                                background.inspectedWindow.navigate(url);
                            }}>
                                <Tooltip title="Open page">
                                    <OpenIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                            <IconButton size="small">
                                <Tooltip title="Remove url">
                                    <DeleteIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                        </Stack>
                    }
                >
                    <ListItemButton dense>
                        {/*
                        <ListItemIcon>
                            <Checkbox edge="start" size="small" />
                        </ListItemIcon>
                        */}
                        <Tooltip title={url}>
                            <ListItemText
                                primary={url}
                                primaryTypographyProps={{
                                    variant: "subtitle2",
                                    style: {
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }
                                }}
                            />
                        </Tooltip>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};