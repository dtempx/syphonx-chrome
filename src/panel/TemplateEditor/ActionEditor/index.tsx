import React, { useMemo } from "react";
import BreakEditor from "./BreakEditor";
import ClickEditor from "./ClickEditor";
import EachEditor from "./EachEditor";
import ErrorEditor from "./ErrorEditor";
import RepeatEditor from "./RepeatEditor";
import SelectEditor from "./SelectEditor";
import SelectTargetEditor from "./SelectTargetEditor";
import SnoozeEditor from "./SnoozeEditor";
import TransformEditor from "./TransformEditor";
import WaitforEditor from "./WaitforEditor";
import YieldEditor from "./YieldEditor";
import EditorFrame from "./components/EditorFrame";
import { useTemplate } from "../../context";
import { Template } from "../lib";

export default () => {
    const { template: json } = useTemplate();

    const item = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        return item;
    }, [json]);

    return (
        <EditorFrame>
            {(function() {
                if (!item)
                    return null;
                else if (item.type === "select")
                    return <SelectEditor />;
                else if (item.type === "union")
                    return <SelectTargetEditor />;
                else if (item.type === "pivot")
                    return <SelectTargetEditor />;
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
                else
                    return null;
            })()}
        </EditorFrame>
    );
};