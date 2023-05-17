import * as React from "react";

import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SxProps,
    Theme
} from "@mui/material";

export type ListItemType = [string, JSX.Element, (event: React.MouseEvent) => void] | null;

export interface Props {
    items: ListItemType[];
    sx?: SxProps<Theme>;
}

export default ({ items, sx }: Props) => (
    <List sx={sx}>
        {items.map(item => {
            return item ?
                (
                    <ListItem key={item[0]} disablePadding>
                        <ListItemButton onClick={event => item[2](event)}>
                            <ListItemIcon>{item[1]}</ListItemIcon>
                            <ListItemText>{item[0]}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <Divider />
                );
        })}
    </List>
);