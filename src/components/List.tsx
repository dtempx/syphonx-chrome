import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material";

export interface Props {
    items: Array<[string, JSX.Element, (event: React.MouseEvent) => void]>;
    sx?: SxProps<Theme>;
}

export default ({ items, sx }: Props) => (
    <List sx={sx}>
        {items.map(item => (
            <ListItem key={item[0]} disablePadding>
                <ListItemButton onClick={event => item[2](event)}>
                    <ListItemIcon>{item[1]}</ListItemIcon>
                    <ListItemText>{item[0]}</ListItemText>
                </ListItemButton>
            </ListItem>
        ))}
    </List>
);