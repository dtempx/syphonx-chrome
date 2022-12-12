import React, { useState } from "react";
import { Box } from "@mui/material";
import { TreeView } from "@mui/lab";
import * as Icons from "@mui/icons-material";
import { useTemplate, TemplateItem } from '../../TemplateContext/index';
import ActionTreeItem from "./ActionTreeItem";

export interface Props {
    items: TemplateItem[] | undefined;
}

export default ({ items }: Props) => {
    const { selected, setSelected } = useTemplate();
    const [expanded, setExpanded] = useState<string[]>([]);

    return (
        <Box>
            <TreeView
                defaultCollapseIcon={<Icons.ExpandMore sx={{ color: "primary.light" }} />}
                defaultExpandIcon={<Icons.ChevronRight sx={{ color: "primary.light" }} />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                onNodeSelect={(event: any, nodeIds: any) => setSelected(nodeIds)}
            >
                {items?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}