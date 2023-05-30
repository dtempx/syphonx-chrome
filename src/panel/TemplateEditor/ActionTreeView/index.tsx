import React, { useEffect, useState } from "react";
import { TreeView } from "@mui/lab";
import { useApp, useTemplate } from "../context";
import { hiliteItem, Template } from "../lib";
import ActionTreeItem from "./ActionTreeItem";
import ActionTreeToolbar from "./ActionTreeToolbar";

import {
    Alert,
    Box,
    Tooltip,
    Typography
} from "@mui/material";

import {
    ExpandMore as CollapseIcon,
    ChevronRight as ExpandIcon
} from "@mui/icons-material";

export default () => {
    const { hotTracking } = useApp();
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);

    useEffect(() => {
        if (template.selected()) {
            const key = template.selected()?.key;
            if (key)
                setSelected([key]);
        }
        else if (template.children[0]) {
            template.setSelected(template.children[0]);
            setTemplate(template.json());
        }
    }, [json]);

    return (
        <Box>
            <ActionTreeToolbar />
            {template.obj.error && (
                <Tooltip title={template.obj.error}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        <Typography fontSize="small" noWrap>{template.obj.error}</Typography>
                    </Alert>
                </Tooltip>                
            )}
            <TreeView
                expanded={expanded}
                selected={selected}
                defaultCollapseIcon={<CollapseIcon sx={{ color: "primary.light" }} />}
                defaultExpandIcon={<ExpandIcon sx={{ color: "primary.light" }} />}
                onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                onNodeSelect={(event: any, value: any) => {
                    const item = template.setSelected(value);
                    setTemplate(template.json());
                    if (hotTracking)
                        hiliteItem(item);
                }}
            >
                {template?.children?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}