import React from "react";
import Toolbar from "./Toolbar";
import ListView from "./ListView";

import {
    Paper,
    Stack
} from "@mui/material";

export default () => {
    return (
        <Paper elevation={3} className="panel" sx={{ width: 1, height: 300 }}>
            <Stack direction="column">
                <Toolbar />
                <ListView sx={{ mt: 1 }} />
            </Stack>
        </Paper>
    );
};