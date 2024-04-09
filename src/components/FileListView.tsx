import React from "react";

import {
    Stack,
    SxProps,
    Theme,
    Typography
} from "@mui/material";

import FileList, { Props as FileListView } from "./FileList";

export interface Props extends FileListView {
    title: string | JSX.Element;
    sx?: SxProps<Theme>;
}

export default ({ title, sx, ...props }: Props) => (
    <Stack sx={sx}>
        <Typography variant="caption" color="secondary">{title}</Typography>
        <FileList {...props}
            sx={{
                overflow: "scroll",
                maxHeight: 100
            }}
            />
    </Stack>
);
