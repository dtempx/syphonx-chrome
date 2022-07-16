import React, { useState } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import { useApp } from '../../../AppContext';
import { parseScript } from "../../../common";
import { SelectAction } from "syphonx-core";
import * as Icons from "@material-ui/icons";

export default () => {
    const { script, selected, setSelected } = useApp();
    const [expanded, setExpanded] = useState([]);

    const actions = parseScript(script);
    const target = actions.find(action => !!(action as SelectAction).select);
    const selects = (target as SelectAction)?.select || [];
    const keypath = "select_1";

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
                {selects.map(select => {
                    const key = `${keypath}.${select.name || "*"}`;
                    const name = select.name || "*";
                    return (<TreeItem nodeId={key} label={name} />);
                })}
            </TreeItem>
        </TreeView>
    );
}