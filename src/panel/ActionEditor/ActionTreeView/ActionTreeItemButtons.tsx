import React from "react";
import { IconButton, Stack } from "@mui/material";
import { ArrowUpward as UpIcon, ArrowDownward as DownIcon, DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { useTemplate } from "../../context";
import { TemplateItem } from "../../../lib";

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => {
    const { template, setTemplate } = useTemplate();

    return (
        <Stack direction="row" spacing={0} justifyContent="end">
            <IconButton size="small" onClick={() => { setTemplate(template.clone().moveItemUp(item)); }}>
                <UpIcon fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
            <IconButton size="small" onClick={() => { setTemplate(template.clone().moveItemDown(item)); }}>
                <DownIcon fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
            <IconButton size="small" onClick={() => { setTemplate(template.clone().removeItem(item)); }}>
                <DeleteIcon fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
        </Stack>
    );
};