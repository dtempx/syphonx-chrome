import React from "react";
import { IconButton, Stack } from "@mui/material";
import * as Icons from "@mui/icons-material";
import { TemplateItem } from '../../TemplateContext/index';

export interface Props {
    item: TemplateItem;
}

export default ({ item }: Props) => (
    <Stack direction="row" spacing={0} justifyContent="end">
        <IconButton size="small">
            <Icons.ArrowUpward fontSize="small" sx={{ color: "primary.light" }} />
        </IconButton>
        <IconButton size="small">
            <Icons.ArrowDownward fontSize="small" sx={{ color: "primary.light" }} />
        </IconButton>
        <IconButton size="small">
            <Icons.DeleteOutlined fontSize="small" sx={{ color: "primary.light" }} />
        </IconButton>
    </Stack>
);