import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TreeView } from "@mui/lab";
import { useTemplate } from "../../context";
import { Template } from "../../../lib";
import ActionTreeItem from "./ActionTreeItem";

import {
    ExpandMore as CollapseIcon,
    ChevronRight as ExpandIcon
} from "@mui/icons-material";

export default () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | undefined>();
    const { template: obj, setTemplate } = useTemplate();
    const template = new Template(obj);

    useEffect(() => {
        setSelected(template.selected()?.key);
    }, [template]);

    function onSelect(event: any, nodeIds: any) {
        debugger;
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
                onNodeSelect={onSelect}
            >
                {template?.children?.map(item => <ActionTreeItem item={item} />)}
            </TreeView>
        </Box>
    );
}