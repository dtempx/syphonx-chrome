import React from "react";
import ActionIcon from "./ActionIcon";
import ActionTypes from "./AddActionMenu.json";

import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

export interface Props {
    expanded?: boolean;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => void;
}

export default ({ expanded = false, onClick }: Props) => {
    const items = expanded ? ActionTypes.slice(0).sort((a, b) => a.name.localeCompare(b.name)) : ActionTypes.filter(type => !type.advanced);
    return (
        <List>
        {items.map(item => (
            <ListItemButton
                onClick={event => onClick(event, item.name)}
            >
                <ListItemIcon>
                    <ActionIcon name={item.name} />
                </ListItemIcon>
                <ListItemText
                    primary={item.name}
                    secondary={item.help}
                />
            </ListItemButton>
        ))}
        </List>
    );
};