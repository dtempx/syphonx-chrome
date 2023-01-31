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
                    <Tooltip title="sequence #">
                        <Typography
                            variant="caption"
                            color="primary.light"
                            sx={{ position: "relative", top: -6, width: 24, mr: 1 }}
                        >
                            {item.index + 1}
                        </Typography>
                    </Tooltip>
                )}
                <Tooltip title={item.icon}><ActionIcon name={item.icon} fontSize="small" sx={{ color: "primary.light" }} /></Tooltip>
                <Typography variant="caption" sx={{ position: "relative", top: -6, left: 2, height: 12 }}>{name(item)}</Typography>
                {item.required && <Tooltip title="required"><Typography variant="caption" sx={{ position: "relative", top: -6, left: 4, color: "primary.light", fontWeight: "bold" }}>!</Typography></Tooltip>}
                {item.repeated && <Tooltip title="repeated"><ActionIcon name="repeated" fontSize="small" sx={{ color: "primary.light", ml: 1 }} /></Tooltip>}
                {(item.obj as syphonx.Select).union && <Tooltip title="union"><ActionIcon name="union" fontSize="small" sx={{ color: "primary.light", ml: 1 }} /></Tooltip>}
                {(item.obj as syphonx.Select).pivot && <Tooltip title="pivot"><ActionIcon name="pivot" fontSize="small" sx={{ color: "primary.light", ml: 1 }} /></Tooltip>}
            </Typography>
            {selected?.key === item.key ? <ActionTreeItemMenu item={item} /> : undefined}
        </Stack>
    );
};