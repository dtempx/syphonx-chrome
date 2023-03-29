import React, { useEffect, useState } from "react";
import { TreeView } from "@mui/lab";
import { useTemplate } from "../context";
import { Template } from "../lib";
import ActionTreeItem from "./ActionTreeItem";

import {
    Alert,
    Box
} from "@mui/material";

import {
    ExpandMore as CollapseIcon,
    ChevronRight as ExpandIcon
} from "@mui/icons-material";

export default () => {
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
            {template.error && <Alert severity="error">{template.error}</Alert>}
            <TreeView
                expanded={expanded}
                selected={selected}
                defaultCollapseIcon={<CollapseIcon sx={{ color: "primary.light" }} />}
                defaultExpandIcon={<ExpandIcon sx={{ color: "primary.light" }} />}
                onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                onNodeSelect={(event: any, value: any) => {
                    template.setSelected(value);
                    setTemplate(template.json());
                }}
            >
                {template?.children?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}