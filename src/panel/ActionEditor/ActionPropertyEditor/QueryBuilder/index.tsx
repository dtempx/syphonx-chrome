import React, { useState } from "react";
import * as syphonx from "syphonx-lib";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, FormControlLabel, IconButton, Stack, Switch, TextField } from "@mui/material";
import { TitleBar, TransitionUp } from "../../../../components";
import { Input as CommitIcon } from "@mui/icons-material";
import FunctionEditor from "./FunctionEditor/index";
import SelectorEditor from "./SelectorEditor";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    query: syphonx.SelectQuery[] | undefined;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery[] | undefined) => void;
}

export default ({ query, open, onClose, onChange }: Props) => {
    const [advanced, setAdvanced] = useState(false);

    const formattedQuery = query ? syphonx.formatJQueryExpression(query[0]) : "";

/*
    function handleClose(event: React.SyntheticEvent) {
        //setTracking(false);
        onClose(event);
    }

    function handleChange(event: React.SyntheticEvent, value: string) {
        if (value) {
            const query = syphonx.parseJQueryExpression(value);
            if (query) {
                onChange(event, [query]);
            }
        }
        else {
            onChange(event, undefined);
        }
    }
    
    function validateSelectQuery(value: string): boolean {
        if (value) {
            let valid = false;
            try {
                valid = syphonx.parseJQueryExpression(value) !== undefined;
            }
            catch(err) {
            }
            return valid;
        }
        else {
            return true;
        }
    }
*/

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Query Builder" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                <Stack direction="row" spacing={0} justifyContent="end">
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={advanced} onChange={event => setAdvanced(event.target.checked)} />}
                            label="Advanced"
                        />
                    </FormGroup>                        
                </Stack>

                <SelectorEditor sx={{ mt: 1 }} />
                <FunctionEditor sx={{ mt: 1 }} />
            </DialogContent>

            <DialogActions>
                <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formattedQuery}
                    //onChange={handleChange}
                    //onValidate={validateSelectQuery}
                    InputProps={{endAdornment: <IconButton size="small" onClick={() => {}}><CommitIcon fontSize="small" /></IconButton>}}
                />
            </DialogActions>
        </Dialog>
    );
};