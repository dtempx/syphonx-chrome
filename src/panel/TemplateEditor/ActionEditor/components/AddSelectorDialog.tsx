import React, { useState } from "react";
import * as syphonx from "syphonx-lib";
import { TransitionUp } from "../components/";
import { useTemplate } from "../../context";
import { Template } from "../lib";
import NameField from "./NameField";

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    MenuItem,
    Switch,
    TextField
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { template: json, setTemplate } = useTemplate();
    const [name, setName] = useState<string | undefined>();
    const [type, setType] = useState<syphonx.SelectType | undefined>();
    const [repeated, setRepeated] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const template = new Template(json);

    function handleCommit(event: React.SyntheticEvent): void {
        const { ok, error } = template.addSelect({ name, type, repeated });
        setError(error);
        if (ok) {
            setTemplate(template.json());
            handleClose(event);
        }
    }

    function handleClose(event: React.SyntheticEvent): void {
        setName("");
        setError("");
        onClose(event);
    }

    function handleMenu(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
        if (["string", "number", "boolean", "object"].includes(event.target.value))
            setType(event.target.value as syphonx.SelectType);
        else
            setType(undefined);
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={TransitionUp}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Add selector</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" onClose={() => setError(undefined)} sx={{ mb: 2 }}>{error}</Alert>}
                <FormGroup>
                    <NameField
                        label="Name"
                        variant="standard"
                        validation="snake-case"
                        value={name}
                        onChange={(event, value) => setName(value)}
                        onHitEnterKey={handleCommit}
                    />
                    <TextField
                        label="Type"
                        variant="standard"
                        value={type}
                        defaultValue="default"
                        onChange={handleMenu}
                        select
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="default">(default)</MenuItem>
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                        <MenuItem value="boolean">boolean</MenuItem>
                        <MenuItem value="object">object</MenuItem>
                    </TextField>
                    <FormControlLabel
                        label="Repeated"
                        labelPlacement="end"
                        control={
                            <Switch
                                size="small"
                                checked={repeated}
                                onChange={(event, value) => setRepeated(value)}
                            />
                        }
                        sx={{ mt: 2 }}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCommit}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};