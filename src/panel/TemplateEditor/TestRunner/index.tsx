import React from "react";
import Toolbar from "./Toolbar";
import ListView from "./ListView";

import {
    Paper,
    Stack
} from "@mui/material";

export default () => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: 1,
                height: 300,
                m: 1,
                p: 1,
                overflow: "auto"
            }}
        >
            <Stack direction="column">
                <Toolbar />
                <ListView sx={{ mt: 1 }} />
            </Stack>
        </Paper>
    );
};