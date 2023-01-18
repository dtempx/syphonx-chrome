import React from "react";
import DebugView from "./DebugView";
import BreakEditor from "./BreakEditor";
import ClickEditor from "./ClickEditor";
import EachEditor from "./EachEditor";
import ErrorEditor from "./ErrorEditor";
import RepeatEditor from "./RepeatEditor";
import SelectEditor from "./SelectEditor";
import SnoozeEditor from "./SnoozeEditor";
import TransformEditor from "./TransformEditor";
import WaitforEditor from "./WaitforEditor";
import YieldEditor from "./YieldEditor";
import { useTemplate } from "../../context";

export default () => {
    const { template, advanced } = useTemplate();
    const item = template.selectedItem();

    if (!item)
        return null;
    else if (item.type === "select")
        return <SelectEditor />;
    else if (item.type === "action" && item.name === "click")
        return <ClickEditor />;
    else if (item.type === "action" && item.name === "break")
        return <BreakEditor />;
    else if (item.type === "action" && item.name === "each")
        return <EachEditor />;
    else if (item.type === "action" && item.name === "error")
        return <ErrorEditor />;
    else if (item.type === "action" && item.name === "repeat")
        return <RepeatEditor />;
    else if (item.type === "action" && item.name === "snooze")
        return <SnoozeEditor />;
    else if (item.type === "action" && item.name === "transform")
        return <TransformEditor />;
    else if (item.type === "action" && item.name === "waitfor")
        return <WaitforEditor />;
    else if (item.type === "action" && item.name === "yield")
        return <YieldEditor />;
    else if (advanced)
        return <DebugView />;
    else
        return null;
};