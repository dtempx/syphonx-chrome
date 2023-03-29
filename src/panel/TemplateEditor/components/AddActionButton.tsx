import React, { useState } from "react";
import { useTemplate } from "../context";
import { Template } from "../lib";
import AddActionDialog from "./AddActionDialog";
import AddSelectorDialog from "./AddSelectorDialog";

import {
    Fab,
    SxProps,
    Theme,
    Tooltip
} from "@mui/material";

import {
    Add as AddIcon
} from "@mui/icons-material";

export interface Props {
    sx?: SxProps<Theme>;
}

export default (props?: Props) => {
    const { template: json } = useTemplate();
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);

    const template = new Template(json);

    function onAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const selected = template.selected();
        if (selected?.type === "select") {
            setSelectorDialogOpen(true);
        }
        else {
            setActionDialogOpen(true);
        }
    }

    return (
        <>
            <Tooltip
                arrow
                placement="left"
                title="Click here to add the first action"
                //open={template.empty()}
                sx={{
                    animation: "pulse 1s infinite ease-in-out",
                    "@keyframes pulse": {
                        "0%": {
                            opacity: 0.5
                        },
                        "100%": {
                            opacity: 1.0
                        }
                    }
                }}
            >
                <Fab
                    {...props}
                    size="small"
                    color="secondary"
                    onClick={onAdd}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            <AddActionDialog
                open={actionDialogOpen}
                onClose={() => setActionDialogOpen(false)}
            />

            <AddSelectorDialog
                open={selectorDialogOpen}
                onClose={() => setSelectorDialogOpen(false)}
            />
        </>
    );
}