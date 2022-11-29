import React, { useState } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import { useTemplate } from '../../../TemplateContext';
import { SelectAction } from "syphonx-core";
import * as Icons from "@material-ui/icons";

export default () => {
    const { template, selected, setSelected } = useTemplate();
    const [expanded, setExpanded] = useState([]);
    const select = (template?.actions.find(action => !!(action as SelectAction).select) as SelectAction)?.select || [];

    function handleToggle(event: any, nodeIds: any) {
        setExpanded(nodeIds);
    }

    function handleSelect(event: any, nodeIds: any) {
        setSelected(nodeIds);
    }

    return (
        <TreeView
            defaultCollapseIcon={<Icons.ExpandMore />}
            defaultExpandIcon={<Icons.ChevronRight />}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
        >
            <TreeItem nodeId="select" label="select">
                {select.map(select => {
                    const key = select.name || "(noname)";
                    const name = select.name || "(noname)";
                    return (<TreeItem nodeId={key} label={name} />);
                })}
            </TreeItem>
        </TreeView>
    );
}