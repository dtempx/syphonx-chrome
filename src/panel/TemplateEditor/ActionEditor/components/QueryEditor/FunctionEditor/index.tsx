import React, { useState } from "react";
import { SelectQueryOp } from "syphonx-lib";

import {
    Box,
    Stack,
    SxProps,
    Theme
} from "@mui/material";

import FunctionName from "./FunctionName";
import FunctionArgs from "./FunctionArgs";
import DeleteButton from "./DeleteButton";
import ShowOutputButton from "./ShowOutputButton";
import SelectorOutput from "../SelectorOutput";

export interface Props {
    query?: SelectQueryOp;
    output?: { text: string | null, html?: string };
    onChange: (event: React.SyntheticEvent, value: SelectQueryOp) => void;
    onDelete?: (event: React.SyntheticEvent) => void;
    sx?: SxProps<Theme>;
}

export default ({ query = [""], output, onChange, onDelete, sx }: Props) => {
    const [showOutput, setShowOutput] = useState(false);

    return (
        <Box sx={sx}>
            <Stack direction="row" spacing={0} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="row" spacing={0}>
                    <FunctionName
                        query={query}
                        onChange={onChange}
                        sx={{ width: 200, maxWidth: 200 }}
                    />
                    <FunctionArgs
                        query={query}
                        onChange={onChange}
                    />
                </Stack>
                <Stack direction="row" spacing={0}>
                    <DeleteButton
                        query={query}
                        onDelete={onDelete}
                    />
                    <ShowOutputButton
                        show={showOutput}
                        visible={!!query[0]}
                        onChange={(event, show) => setShowOutput(show)}
                    />
                </Stack>
            </Stack>
            {showOutput && query[0] && output && <SelectorOutput text={output.text} html={output.html} />}
        </Box>
    );
};