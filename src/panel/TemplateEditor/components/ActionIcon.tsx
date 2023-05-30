import React from "react";
import { SvgIconProps } from "@mui/material";

import {
    Rule as BooleanTypeIcon,
    DangerousOutlined as BreakIcon,
    TouchAppOutlined as ClickIcon,
    ArrowRightAlt as CaseIcon,
    FormatListNumbered as EachIcon,
    GppMaybeOutlined as ErrorIcon,
    ArrowBack as GoBackIcon,
    Abc as ItemIcon,
    ReadMore as LocatorIcon,
    NearMeOutlined as NavigateIcon,
    Numbers as NumberTypeIcon,
    DataObject as ObjectTypeIcon,
    PivotTableChart as PivotIcon,
    Loupe as PlaceholderIcon,
    Replay as ReloadIcon,
    Autorenew as RepeatIcon,
    MoreVert as RepeatedIcon,
    PriorityHighOutlined as RequiredIcon,
    CameraAltOutlined as ScreenshotIcon,
    ImportExport as ScrollIcon,
    HighlightAlt as SelectIcon,
    Snooze as SnoozeIcon,
    Abc as StringTypeIcon,
    Shuffle as SwitchIcon,
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
    else if (name === "case")
        return <CaseIcon {...props} />;
    else if (name === "click")
        return <ClickIcon {...props} />;
    else if (name === "each")
        return <EachIcon {...props} />;
    else if (name === "error")
        return <ErrorIcon {...props} />;
    else if (name === "goback")
        return <GoBackIcon {...props} />;
    else if (name === "item")
        return <ItemIcon {...props} />;
    else if (name === "locator")
        return <LocatorIcon {...props} />;
    else if (name === "navigate")
        return <NavigateIcon {...props} />;
    else if (name === "number")
        return <NumberTypeIcon {...props} />;
    else if (name === "object")
        return <ObjectTypeIcon {...props} />;
    else if (name === "pivot")
        return <PivotIcon {...props} />;
    else if (name === "placeholder")
        return <PlaceholderIcon {...props} />;
    else if (name === "reload")
        return <ReloadIcon {...props} />;
    else if (name === "repeat")
        return <RepeatIcon {...props} />;
    else if (name === "repeated")
        return <RepeatedIcon {...props} />;
    else if (name === "required")
        return <RequiredIcon {...props} />;
    else if (name === "screenshot")
        return <ScreenshotIcon {...props} />;
    else if (name === "scroll")
        return <ScrollIcon {...props} />;
    else if (name === "select")
        return <SelectIcon {...props} />;
    else if (name === "string")
        return <StringTypeIcon {...props} />;
    else if (name === "snooze")
        return <SnoozeIcon {...props} />;
    else if (name === "switch")
        return <SwitchIcon {...props} />;
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