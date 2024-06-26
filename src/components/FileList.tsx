import React from "react";

import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SxProps,
    Theme
} from "@mui/material";

import {
    InsertDriveFileOutlined as FileIcon
} from "@mui/icons-material";

export interface Props {
    files: string[];
    onSelectFile: (event: React.SyntheticEvent, file: string) => void;
    sx?: SxProps<Theme>;
}

export default ({ files, onSelectFile, sx }: Props) => (
    <List
        sx={{
            ml: 2,
            "& *": { p: 0 },
            "& > * > :first-child": {
                color: "secondary.light",
                minWidth: 0,
                mr: 1
            },
            ...sx
        }}
    >
        {files.filter(file => !file.endsWith("/")).map(file => (
            <ListItemButton onClick={event => onSelectFile(event, file)}>
                <ListItemIcon><FileIcon /></ListItemIcon>
                <ListItemText primary={file} title={file} />
            </ListItemButton>
        ))}
    </List>
);