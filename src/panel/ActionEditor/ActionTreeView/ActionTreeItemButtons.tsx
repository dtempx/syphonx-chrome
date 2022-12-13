import React from "react";
import { IconButton, Stack } from "@mui/material";
import * as Icons from "@mui/icons-material";
import { useTemplate } from "../../TemplateContext";
import { TemplateItem } from "../../../lib";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const { template, setTemplate } = useTemplate();

    return (
        <Stack direction="row" spacing={0} justifyContent="end">
            <IconButton size="small" onClick={() => { setTemplate(template.clone().moveItemUp(item)); }}>
                <Icons.ArrowUpward fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
            <IconButton size="small" onClick={() => { setTemplate(template.clone().moveItemDown(item)); }}>
                <Icons.ArrowDownward fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
            <IconButton size="small" onClick={() => { setTemplate(template.clone().removeItem(item)); }}>
                <Icons.DeleteOutlined fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
        </Stack>
    );
};