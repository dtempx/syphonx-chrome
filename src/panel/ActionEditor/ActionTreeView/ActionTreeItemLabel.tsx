import React from "react";
import { Stack, Typography } from "@mui/material";
import ActionIcon from "../ActionIcon";
import ActionTreeItemButtons from "./ActionTreeItemButtons";
import { useTemplate, TemplateItem } from "../../TemplateContext";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const { selected } = useTemplate();

    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography align="left" sx={{ mt: 1 }}>
                <ActionIcon name={item.icon} fontSize="small" sx={{ color: "primary.light" }} />
                <Typography variant="caption" sx={{ position: "relative", top: -6, left: 2 }}>{item.name}</Typography>
                {item.required ? <Typography variant="caption" sx={{ position: "relative", top: -6, left: 4, color: "primary.light", fontWeight: "bold" }}>!</Typography> : null}
                {item.repeated ? <ActionIcon name="repeated" fontSize="small" sx={{ color: "primary.light", ml: 1 }} /> : null}
            </Typography>
            {selected === item.key ? <ActionTreeItemButtons item={item} /> : undefined}
        </Stack>
    );
};