import React from "react";
import { SvgIconProps } from "@mui/material";
import {
    Rule as BooleanTypeIcon,
    DangerousOutlined as BreakIcon,
    TouchAppOutlined as ClickIcon,
    FormatListNumbered as EachIcon,
    GppMaybeOutlined as ErrorIcon,
    Abc as ItemIcon,
    Numbers as NumberTypeIcon,
    DataObject as ObjectTypeIcon,
    PivotTableChart as PivotIcon,
    Autorenew as RepeatIcon,
    AutoAwesomeMotionOutlined as RepeatedIcon,
    PriorityHighOutlined as RequiredIcon,
    HighlightAlt as SelectIcon,
    Snooze as SnoozeIcon,
    Abc as StringTypeIcon,
    Transform as TransformIcon,
    Mediation as UnionIcon,
    QuestionMark as UnknownIcon,
    HourglassEmpty as WaitforIcon,
    ExitToApp as YieldIcon
} from "@mui/icons-material";

export interface Props extends SvgIconProps {
    name: string;
}

export default ({ name, ...props }: Props) => {
    if (name === "boolean")
        return <BooleanTypeIcon {...props} />;
    else if (name === "break")
        return <BreakIcon {...props} />;
    else if (name === "click")
        return <ClickIcon {...props} />;
    else if (name === "each")
        return <EachIcon {...props} />;
    else if (name === "error")
        return <ErrorIcon {...props} />;
    else if (name === "item")
        return <ItemIcon {...props} />;
    else if (name === "number")
        return <NumberTypeIcon {...props} />;
    else if (name === "object")
        return <ObjectTypeIcon {...props} />;
    else if (name === "pivot")
        return <PivotIcon {...props} />;
    else if (name === "repeat")
        return <RepeatIcon {...props} />;
    else if (name === "repeated")
        return <RepeatedIcon {...props} />;
    else if (name === "required")
        return <RequiredIcon {...props} />;
    else if (name === "select")
        return <SelectIcon {...props} />;
    else if (name === "string")
        return <StringTypeIcon {...props} />;
    else if (name === "snooze")
        return <SnoozeIcon {...props} />;
    else if (name === "transform")
        return <TransformIcon {...props} />;
    else if (name === "union")
        return <UnionIcon {...props} />;
    else if (name === "waitfor")
        return <WaitforIcon {...props} />;
    else if (name === "yield")
        return <YieldIcon {...props} />;
    else
        return <UnknownIcon {...props} />;
};