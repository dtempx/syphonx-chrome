import React, { useState } from "react";
import { Box } from "@mui/material";
import { TreeView } from "@mui/lab";
import { ExpandMore as CollapseIcon, ChevronRight as ExpandIcon } from "@mui/icons-material";
import { useTemplate } from "../../context";
import ActionTreeItem from "./ActionTreeItem";

export default () => {
    const { template, setTemplate } = useTemplate();
    const [expanded, setExpanded] = useState<string[]>([]);

    return (
        <Box>
            <TreeView
                defaultCollapseIcon={<CollapseIcon sx={{ color: "primary.light" }} />}
                defaultExpandIcon={<ExpandIcon sx={{ color: "primary.light" }} />}
                expanded={expanded}
                selected={template.selected}
                onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                onNodeSelect={(event: any, nodeIds: any) => { template.selected = nodeIds; setTemplate(template.clone()); }}
            >
                {template?.children?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}