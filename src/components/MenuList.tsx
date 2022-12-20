import * as React from 'react';
import { ListItemIcon, ListItemText, MenuList, MenuItem, SxProps, Theme  } from "@mui/material";

export interface Props {
    items: Array<[string, JSX.Element, (event: React.MouseEvent) => void]>;
    sx?: SxProps<Theme>;
}

export default ({ items, sx }: Props) => (
    <MenuList sx={sx}>
        {items.map(item => (
            <MenuItem key={item[0]} onClick={event => item[2](event)}>
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText>{item[0]}</ListItemText>
            </MenuItem>
        ))}
    </MenuList>
);