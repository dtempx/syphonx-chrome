import React from "react";

import {
    Box,
    SxProps,
    TextareaAutosize,
    Theme
} from "@mui/material";

export interface Props {
    text: string | null;
    html?: string;
    sx?: SxProps<Theme>;
}

export default ({ text, html, sx }: Props) => {
    const value = text === null ? "∅" : html ? `${text}\n\n${html}` : text;
    return (
        <Box sx={sx}>
            <TextareaAutosize
                minRows={2}
                maxRows={6}
                value={value}
                style={{
                    marginTop: "16px",
                    width: "100%",
                    height: "100px",
                    overflow: "scroll",
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    backgroundColor: "LightGray"
                }}
            />
        </Box>
    );
}
