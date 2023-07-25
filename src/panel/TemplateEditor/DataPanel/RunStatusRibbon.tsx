import React from "react";
import { useTemplate } from "./context";

import {
    Stack,
    Typography
} from "@mui/material";

import {
    CountdownTimer
} from "../components";

export default () => {
    const { extractStatus: status, refreshing } = useTemplate();
    if (refreshing && status)
        return (
            <Stack direction="row" sx={{ position: "relative", top: 6 }}>
                <Typography
                    variant="caption"
                    noWrap
                >STEP {status.step}</Typography>
                <Typography
                    variant="caption"
                    color="primary"
                    noWrap
                    sx={{ ml: 1 }}
                >{status.action}</Typography>
                {status.name && (
                    <Typography
                        variant="caption"
                        color="primary.light"
                        fontStyle="italic"
                        noWrap
                        sx={{ ml: 1 }}
                    >{status.name}</Typography>
                )}
                {status.timeout && (
                    <CountdownTimer
                        seconds={status.timeout || 0}
                        size={12}
                        thickness={24}
                        key={status.step}
                        flip
                        sx={{ ml: 1, position: "relative", top: 4 }}
                    />
                )}
            </Stack>
        );
    else
        return null;
}