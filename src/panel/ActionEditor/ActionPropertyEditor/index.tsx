import React from "react";
import DebugView from "./DebugView";
import ClickEditor from "./ClickEditor";
import SelectEditor from "./SelectEditor";
import { useTemplate } from '../../context';

export default () => {
    const { template, advanced } = useTemplate();
    const item = template.selectedItem();
    const action = item?.type === "action" ? item.name : undefined;

    if (action === "select")
        return <SelectEditor />;
    else if (action === "click")
        return <ClickEditor />;
    else if (advanced)
        return <DebugView />;
    else
        return null;
};