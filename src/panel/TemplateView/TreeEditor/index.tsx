import React from "react";
import { Grid } from "@mui/material";
import ScriptTreeView from "./ScriptTreeView";
import ScriptPropertyTable from "./ScriptPropertyTable";

export default () => (
    <Grid container>
        <Grid item xs={3}>
            <ScriptTreeView />
        </Grid>
        <Grid item xs={9}>
            <ScriptPropertyTable />
        </Grid>
    </Grid>
);