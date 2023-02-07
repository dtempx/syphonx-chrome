import React from "react";
import * as syphonx from "syphonx-lib";
import ActionIcon from "../ActionIcon";
import ActionTreeItemMenu from "./ActionTreeItemMenu";
import { useTemplate } from "../context";
import { Template, TemplateItem } from "../lib";

import {
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    WarningAmberOutlined as AlertIcon,
    LowPriority as ConditionalIcon,
    DoNotDisturb as DisabledIcon,
    MoreVert as RepeatedIcon,
    PivotTableChart as PivotIcon,
    Mediation as UnionIcon
} from "@mui/icons-material";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const { template: json } = useTemplate();
    const template = new Template(json);
    const selected = template.selected();

    function name(item: TemplateItem) {
        if (item.name)
            return item.name;
        else if (item.repeated)
            return "(array)";
        else if (item.type === "select" && (item.obj as syphonx.Select)?.type === "object")
            return "(object)";
        else
            return "(value)";
    }

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography align="left" sx={{ mt: 1 }}>
                {item.type === "action" && (
                    <Tooltip title="step #">
                        <Typography
                            variant="caption"
                            color="primary.light"
                            sx={{ position: "relative", top: -6, width: 24, mr: 1 }}
                        >
                            {item.step}
                        </Typography>
                    </Tooltip>
                )}
                <Tooltip title={item.icon}><ActionIcon name={item.icon} fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>
                <Typography variant="caption" sx={{ position: "relative", top: -6, left: 2, height: 12, mr: 1 }}>{name(item)}</Typography>
                {item.conditional && <Tooltip title="conditional"><ConditionalIcon fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>}
                {item.repeated && <Tooltip title="repeated"><RepeatedIcon fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>}
                {(item.obj as syphonx.Select)?.union && <Tooltip title="union"><UnionIcon fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>}
                {(item.obj as syphonx.Select)?.pivot && <Tooltip title="pivot"><PivotIcon fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>}
                {item.alert && <Tooltip title={item.alert}><AlertIcon color="warning" fontSize="small" /></Tooltip>}
                {item.active === false && <Tooltip title="disabled"><DisabledIcon color="warning" fontSize="small" /></Tooltip>}
            </Typography>
            {selected?.key === item.key ? <ActionTreeItemMenu item={item} /> : undefined}
        </Stack>
    );
};