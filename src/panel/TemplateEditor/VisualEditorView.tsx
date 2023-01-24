import React from "react";
import ActionEditor from "./ActionEditor";
import ActionTreeView from "./ActionTreeView";
import AddActionButton from "./AddActionButton/index";
import { useApp } from "../context";

import {
    FormControlLabel,
    FormGroup,
    Paper,
    Stack,
    Switch
} from "@mui/material";

export default () => {
    const { advanced, setAdvanced } = useApp();

    return (
        <Stack
            direction="row"
            sx={{
                width: 1,
                "& > :not(style)": {
                    height: 300
                }    
            }}
        >
            <Paper elevation={3} className="panel" sx={{ width: 400 }}>
                <ActionTreeView />
                <AddActionButton
                    sx={{
                        position: "absolute",
                        bottom: theme => theme.spacing(2),
                        right: theme => theme.spacing(2)
                    }}
                />
            </Paper>
            <Paper elevation={3} className="panel" sx={{ width: 1 }}>
                <Stack direction="row" spacing={0} justifyContent="end">
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={advanced} onChange={event => setAdvanced(event.target.checked)} />}
                            label="Advanced"
                        />
                    </FormGroup>                        
                </Stack>
                <ActionEditor />
            </Paper>
        </Stack>
    );
};