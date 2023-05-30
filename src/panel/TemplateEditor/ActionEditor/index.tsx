import React from "react";
import BreakEditor from "./BreakEditor";
import ClickEditor from "./ClickEditor";
import EachEditor from "./EachEditor";
import ErrorEditor from "./ErrorEditor";
import GoBackEditor from "./GoBackEditor";
import LocatorEditor from "./LocatorEditor";
import NavigateEditor from "./NavigateEditor";
import ReloadEditor from "./ReloadEditor";
import RepeatEditor from "./RepeatEditor";
import ScreenshotEditor from "./ScreenshotEditor";
import ScrollEditor from "./ScrollEditor";
import SelectEditor from "./SelectEditor";
import SnoozeEditor from "./SnoozeEditor";
import SubSelectEditor from "./SubSelectEditor";
import SwitchEditor from "./SwitchEditor";
import TransformEditor from "./TransformEditor";
import WaitforEditor from "./WaitforEditor";
import YieldEditor from "./YieldEditor";
import EditorFrame from "./components/EditorFrame";
import { useTemplate } from "../context";
import { Template } from "../lib";

export default () => {
    const { template: json, setTemplate } = useTemplate();
    const template = new Template(json);
    const item = template.selected();

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
                else if (item.type === "case")
                    return <SwitchEditor item={item} onChange={onChange} />;
                else if (item.type === "locator")
                    return <LocatorEditor item={item} onChange={onChange} />;
                else if (item.type === "pivot")
                    return <SubSelectEditor item={item} onChange={onChange} />;
                else if (item.type === "switch")
                    return <SwitchEditor item={item} onChange={onChange} />;
                else if (item.type === "transform")
                    return <TransformEditor item={item} onChange={onChange} />;
                else if (item.type === "union")
                    return <SubSelectEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "click")
                    return <ClickEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "break")
                    return <BreakEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "each")
                    return <EachEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "error")
                    return <ErrorEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "goback")
                    return <GoBackEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "locator" && item.children && item.children[0])
                    return <LocatorEditor item={item.children[0]} onChange={onChange} />;
                else if (item.type === "action" && item.name === "navigate")
                    return <NavigateEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "reload")
                    return <ReloadEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "repeat")
                    return <RepeatEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "screenshot")
                    return <ScreenshotEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "scroll")
                    return <ScrollEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "select" && item.children && item.children[0])
                    return <SelectEditor item={item.children[0]} onChange={onChange} />;
                else if (item.type === "action" && item.name === "snooze")
                    return <SnoozeEditor item={item} onChange={onChange} />;
                else if (item.type === "action" && item.name === "switch" && item.children && item.children[0])
                    return <SwitchEditor item={item.children[0]} onChange={onChange} />;
                else if (item.type === "action" && item.name === "transform" && item.children && item.children[0])
                    return <TransformEditor item={item.children[0]} onChange={onChange} />;
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