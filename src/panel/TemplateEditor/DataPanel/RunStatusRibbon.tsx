import React from "react";
import { useTemplate } from "./context";

import {
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    CountdownTimer
} from "../components";

export default () => {
    const { extractStatus: status, refreshing } = useTemplate();
    if (refreshing && status)
        return (
            <Stack direction="row">
                <Typography noWrap>STEP {status.step}</Typography>
                <Typography
                    color="primary"
                    noWrap
                    sx={{ ml: 1 }}
                >{status.action}</Typography>
                {status.timeout && (
                    <CountdownTimer
                        seconds={status.timeout}
                        size={16}
                        thickness={8}
                        sx={{ position: "relative", top: 4, left: 4 }}
                    />
                )}
                {status.name && (
                    <Tooltip title={status.name}>
                        <Typography
                            variant="caption"
                            color="primary.light"
                            noWrap
                            sx={{ ml: 1, position: "relative", top: 4 }}
                        >{status.name}</Typography>
                    </Tooltip>
                )}
            </Stack>
        );
    else
        return null;
}