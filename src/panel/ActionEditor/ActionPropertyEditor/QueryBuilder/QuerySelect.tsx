import React from "react";
import { Divider, IconButton, MenuItem, Select, SelectChangeEvent, SxProps, Stack, Theme, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export interface Props {
    selectedItem: string;
    items: string[];
    onSelect: (event: SelectChangeEvent<unknown>, item: string) => void;
    onAdd: (event: SelectChangeEvent<unknown>) => void;
    onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: string) => void;
    sx?: SxProps<Theme>;
}

export default ({ selectedItem, items, onSelect, onAdd, onDelete, ...props }: Props) => {
    function handleSelect(event: SelectChangeEvent<unknown>) {
        if (typeof event.target.value === "string")
            onSelect(event, event.target.value);
        else
            onAdd(event);
    }

    return (
        <Select
            {...props}
            variant="outlined"
            size="small"
            value={selectedItem}
            onChange={handleSelect}
        >
            {items.map(item => (
                <MenuItem value={item}>
                    <Stack direction="row" spacing={0}>
                        <Typography align="left">{item}</Typography>
                        <Typography align="right">
                            <IconButton size="small" onClick={event => onDelete(event, item)}><DeleteIcon fontSize="small" /></IconButton>
                        </Typography>
                    </Stack>
                </MenuItem>
            ))}
            <Divider />
            <MenuItem value="">Add New...</MenuItem>
        </Select>
    );
}