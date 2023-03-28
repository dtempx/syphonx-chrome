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
    Delete as DeleteIcon
} from "@mui/icons-material";

export interface Props {
    sx?: SxProps<Theme>;
}

export default ({ sx }: Props) => {
    const { template: json, setTemplate, refresh } = useTemplate();

    const { template, tests } = useMemo(() => {
        const template = new Template(json);
        const tests = template.tests();
        return { template, tests };
    }, [json]);

    return (
        <List dense sx={sx}>
            {tests.map(test => test.url).map(url => (
                <ListItem
                    key={url}
                    dense
                    secondaryAction={
                        <Stack direction="row">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    template.removeTest(url);
                                    setTemplate(template.json());
                                }}
                            >
                                <Tooltip title="Remove url">
                                    <DeleteIcon fontSize="small" />
                                </Tooltip>
                            </IconButton>
                        </Stack>
                    }
                >
                    <ListItemButton
                        dense
                        onClick={async () => {
                            await background.inspectedWindow.navigate(url);
                            await refresh(false);
                        }}
                    >
                        {/*
                        <ListItemIcon>
                            <Checkbox edge="start" size="small" />
                        </ListItemIcon>
                        */}
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
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};