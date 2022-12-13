import * as React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export type MenuListItem = [string, JSX.Element, (event: React.MouseEvent) => void];

export interface Props {
    items: MenuListItem[];
}

export default ({ items }: Props) => (
    <List>
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