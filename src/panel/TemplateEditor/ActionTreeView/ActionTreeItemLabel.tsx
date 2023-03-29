import React from "react";
import * as syphonx from "syphonx-lib";
import ActionTreeItemMenu from "./ActionTreeItemMenu";
import { useTemplate } from "../context";
import { Template, TemplateItem } from "../lib";
import { ActionIcon } from "../components";

import {
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    WarningAmberOutlined as AlertIcon,
    LowPriority as ConditionalIcon,
    DoNotDisturb as DisabledIcon,
    FormatListNumberedRtl as RepeatedIcon,
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

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography align="left" noWrap sx={{ mt: 1 }}>
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
                <Typography variant="caption" sx={{ position: "relative", top: -6, left: 2, height: 12, mr: 1 }}>
                    <Typography variant="caption">{item.name}</Typography>
                    {item.num && <Typography variant="caption" color="primary.light" sx={{ ml: "2px" }}>#{item.num}</Typography>}
                    {item.caption && <Tooltip title={item.caption}><Typography variant="caption" color="primary.light" sx={{ ml: 1 }}>{item.caption}</Typography></Tooltip>}
                </Typography>
            </Typography>
            <Stack direction="row">
                {item.alert && <Tooltip title={item.alert}><AlertIcon color="warning" fontSize="small" sx={{ position: "relative", top: 4 }} /></Tooltip>}
                {item.conditional && <Tooltip title="conditional"><ConditionalIcon fontSize="small" sx={{ color: "primary.light", position: "relative", top: 4 }} /></Tooltip>}
                {item.repeated && <Tooltip title="repeated"><RepeatedIcon fontSize="small" sx={{ color: "primary.light", position: "relative", top: 4 }} /></Tooltip>}
                {(item.obj as syphonx.Select)?.union && <Tooltip title="union"><UnionIcon fontSize="small" sx={{ color: "primary.light", position: "relative", top: 4 }} /></Tooltip>}
                {(item.obj as syphonx.Select)?.pivot && <Tooltip title="pivot"><PivotIcon fontSize="small" sx={{ color: "primary.light", position: "relative", top: 4 }} /></Tooltip>}
                {item.active === false && <Tooltip title="disabled"><DisabledIcon color="warning" fontSize="small" sx={{ position: "relative", top: 4 }} /></Tooltip>}
                <ActionTreeItemMenu item={item} sx={{ visibility: selected?.key === item.key ? "visible" : "hidden" }} />
            </Stack>
        </Stack>
    );
};