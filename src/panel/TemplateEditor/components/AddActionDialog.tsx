import React, { useState } from "react";
import { TransitionUp } from "../ActionEditor/components";
import { useTemplate } from "../ActionEditor/components/context";
import { Template, TemplateAction } from "../ActionEditor/components/lib";
import AddActionMenu from "./AddActionMenu";
import AddSelectorDialog from "./AddSelectorDialog";

import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormControlLabel,
    IconButton,
    Switch,
    Typography
} from "@mui/material";

import {
    Close as CloseIcon
} from "@mui/icons-material"

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { template: json, setTemplate } = useTemplate();
    const [expanded, setExpanded] = useState(false);
    const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);
    const [addNewSelectAction, setAddNewSelectAction] = useState(false);

    const template = new Template(json);

    function onMenuClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, action: string): void {
        const selected = template.selected();
        if (action === "select" && selected?.type === "action" && selected?.name === "select") {
            setAddNewSelectAction(false);
            setSelectorDialogOpen(true);
        }
        else if (action === "select") {
            setAddNewSelectAction(true);
            setSelectorDialogOpen(true);
        }
        else {
            template.addItem(action as TemplateAction);
            setTemplate(template.json());
        }
        onClose(event);
    }

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={TransitionUp}
                keepMounted
                onClose={onClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    <Typography>Add Action</Typography>
                    <IconButton
                        onClick={event => onClose(event)}
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
                <DialogContent>
                    <FormGroup>
                        <Box
                            sx={{
                                height: 300,
                                maxHeight: 300,
                                overflowY: "scroll"
                            }}
                        >
                            <AddActionMenu
                                expanded={expanded}
                                onClick={onMenuClick}
                            />
                        </Box>
                        <FormControlLabel
                            label="Show all actions"
                            control={
                                <Switch
                                    size="small"
                                    checked={expanded}
                                    onChange={(event, value) => setExpanded(value)}
                                />
                            }
                            sx={{ mt: 2 }}
                        />
                    </FormGroup>
                </DialogContent>
            </Dialog>

            <AddSelectorDialog
                addNewSelectAction={addNewSelectAction}
                open={selectorDialogOpen}
                onClose={() => setSelectorDialogOpen(false)}
            />
        </>
    );
};