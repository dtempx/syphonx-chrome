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
    const { template: json, setTemplate } = useTemplate();

    const { template, item } = useMemo(() => {
        const template = new Template(json);
        const item = template.selected();
        return { template, item };
    }, [json]);

    function onChange() {
        setTemplate(template.json());
    }

    return (
        <EditorFrame>
            {(function() {
                if (!item)
                    return null;
                else if (item.type === "select")
                    return <SelectEditor item={item} onChange={onChange} />;
                else if (item.type === "union")
                    return <SelectTargetEditor item={item} onChange={onChange} />;
                else if (item.type === "pivot")
                    return <SelectTargetEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "click")
                    return <ClickEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "break")
                    return <BreakEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "each")
                    return <EachEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "error")
                    return <ErrorEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "repeat")
                    return <RepeatEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "select" && item.children && item.children[0])
                    return <SelectEditor item={item.children[0]} onChange={onChange} />;
                else if (item.type === "action" && item.name === "snooze")
                    return <SnoozeEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "transform")
                    return <TransformEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "waitfor")
                    return <WaitforEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "yield")
                    return <YieldEditor item={item} onChange={onChange} />;
                else
                    return null;
            })()}
        </EditorFrame>
    );
};