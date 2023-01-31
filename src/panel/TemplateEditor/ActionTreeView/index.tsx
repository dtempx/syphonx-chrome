import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TreeView } from "@mui/lab";
import { useTemplate } from "../context";
import { Template } from "../lib";
import ActionTreeItem from "./ActionTreeItem";

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
        const key = template.selected()?.key;
        setSelected(key ? [key] : []);
    }, [json]);

    function handleSelect(event: any, nodeIds: any) {
        template.setSelected(nodeIds);
        setTemplate(template.toString());
    }

    return (
        <Box>
            <TreeView
                defaultCollapseIcon={<CollapseIcon sx={{ color: "primary.light" }} />}
                defaultExpandIcon={<ExpandIcon sx={{ color: "primary.light" }} />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                onNodeSelect={handleSelect}
            >
                {template?.children?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}