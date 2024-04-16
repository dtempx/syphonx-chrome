import React from "react";
import { useTemplate } from "../context";
import { path } from "../lib";

import {
    Chip,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    InsertDriveFileOutlined as FileIcon,
    History as RevisionIcon
} from "@mui/icons-material";

export interface Props {
    maxLength?: number;
}

export default ({ maxLength = 60 }: Props) => {
    const { templateFile, templateRevision } = useTemplate();

    if (!templateFile)
        return null;

    return (
        <Chip
            label={
                <Stack direction="row">
                    <Tooltip title={templateFile}>
                        <Typography>{path.shorten(templateFile, maxLength)}</Typography>
                    </Tooltip>
                    {templateRevision &&
                    <Tooltip title={templateRevision}>
                        <RevisionIcon color="error" fontSize="small" sx={{ ml: 1, top: 2 }} />
                    </Tooltip>}
                </Stack>
            }
            variant="outlined"
            color="primary"
            size="small"
            icon={<FileIcon sx={{ ml: 1 }} />}
            sx={{ m: 1 }}
        />
    );
};
