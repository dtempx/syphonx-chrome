import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { TransitionUp } from "../ActionEditor/components";
import { useTemplate } from "../ActionEditor/components/context";
import { Template } from "../ActionEditor/components/lib";
import NameField from "../ActionEditor/components/NameField";

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    IconButton,
    MenuItem,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import {
    Close as CloseIcon
} from "@mui/icons-material"

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void;
    addNewSelectAction?: boolean;
}

export default ({ open, onClose, addNewSelectAction }: Props) => {
    const { template: json, setTemplate } = useTemplate();
    const [name, setName] = useState<string | undefined>();
    const [type, setType] = useState<syphonx.SelectType | undefined>();
    const [repeated, setRepeated] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const template = new Template(json);

    useEffect(() => {
        if (open) {
            setName(undefined);
            setType(undefined);
            setRepeated(false);
            setError(undefined);
        }
    }, [open]);

    function handleCommit(event: React.SyntheticEvent): void {
        if (addNewSelectAction)
            template.addItem("select", false);
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
            <DialogTitle>
                <Typography>Add Action</Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: theme => theme.spacing(1),
                        right: theme => theme.spacing(1),
                        color: theme => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: 250 }}>
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
                        sx={{ mt: 4 }}
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
                <Button onClick={handleCommit}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};