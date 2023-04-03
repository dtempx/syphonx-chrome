import React from "react";
import { useApp } from "./context";

import {
    Box,
    SxProps,
    TextareaAutosize,
    Theme
} from "@mui/material";

export interface Props {
    output: Array<string | null>;
    html: string;
    sx?: SxProps<Theme>;
}

export default ({ output, html, sx }: Props) => {
    const { debug } = useApp();

    let value = output.map(line => line?.trim() || "").join("\n");
    if (debug)
        value += "\n\n" + html;

    return (
        <Box sx={sx}>
            <TextareaAutosize
                minRows={2}
                maxRows={6}
                value={value}
                style={{
                    marginTop: "16px",
                    width: "100%",
                    overflow: "scroll",
                    backgroundColor: "LightGray"
                }}
            />
        </Box>
    );
}