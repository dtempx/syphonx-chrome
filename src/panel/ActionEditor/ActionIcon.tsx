import React from "react";
import { SvgIconProps } from "@mui/material";
import {
    Abc as ItemIcon,
    Abc as StringTypeIcon,
    AutoAwesomeMotion as EachIcon,
    AutoAwesomeMotionOutlined as RepeatedIcon,
    Autorenew as RepeatIcon,
    DataObject as ObjectTypeIcon,
    ExitToApp as YieldIcon,
    FlipCameraAndroid as TransformIcon,
    GppMaybe as ErrorIcon,
    HourglassTop as WaitforIcon,
    Numbers as NumberTypeIcon,
    PriorityHighOutlined as RequiredIcon,
    QuestionMark as UnknownIcon,
    Rule as BooleanTypeIcon,
    TouchApp as ClickIcon,
    SelectAll as SelectIcon,
    Timer as SnoozeIcon
} from "@mui/icons-material";

export interface Props extends SvgIconProps {
    name: string;
}

export default ({ name, ...props }: Props) => {
    if (name === "boolean")
        return <BooleanTypeIcon {...props} />;
    if (name === "click")
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
    else if (name === "waitfor")
        return <WaitforIcon {...props} />;
    else if (name === "yield")
        return <YieldIcon {...props} />;
    else
        return <UnknownIcon {...props} />;
};