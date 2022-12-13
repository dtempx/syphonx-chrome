import React from "react";
import * as Icons from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

export interface Props extends SvgIconProps {
    name: string;
}

export default ({ name, ...props }: Props) => {
    if (name === "boolean")
        return <Icons.Rule {...props} />;
    if (name === "click")
        return <Icons.TouchApp {...props} />;
    else if (name === "each")
        return <Icons.AutoAwesome {...props} />;
    else if (name === "error")
        return <Icons.GppMaybe {...props} />;
    else if (name === "item")
        return <Icons.Abc {...props} />;
    else if (name === "number")
        return <Icons.Numbers {...props} />;
    else if (name === "object")
        return <Icons.DataObject {...props} />;
    else if (name === "repeat")
        return <Icons.Autorenew {...props} />;
    else if (name === "repeated")
        return <Icons.AutoAwesomeMotionOutlined {...props} />;
    else if (name === "required")
        return <Icons.PriorityHighOutlined {...props} />;
    else if (name === "select")
        return <Icons.SelectAll {...props} />;
    else if (name === "string")
        return <Icons.Abc {...props} />;
    else if (name === "snooze")
        return <Icons.Timer {...props} />;
    else if (name === "transform")
        return <Icons.FlipCameraAndroid {...props} />;
    else if (name === "waitfor")
        return <Icons.HourglassTop {...props} />;
    else if (name === "yield")
        return <Icons.ExitToApp {...props} />;
    else
        return <Icons.QuestionMark {...props} />;
};