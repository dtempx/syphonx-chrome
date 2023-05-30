import React, { useState } from "react";
import { useTemplate } from "../context";
import { Template } from "../lib";

import {
    AddActionDialog,
    AddSelectorDialog
} from "./components";

import {
    Box,
    Button,
    SxProps,
    Theme,
    Typography
} from "@mui/material";

import {
    Add as AddIcon
} from "@mui/icons-material";

export interface Props {
    sx?: SxProps<Theme>;
}

const buttonLabelMap: Record<string, string> = {
    "case": "Add Case",
    "locator": "Add Locator",
    "placeholder": "Add Selector",
    "select": "Add Selector",
    "transform": "Add Transform",
    "union": "Add Union"
};

export default ({ sx }: Props) => {
    const { template: json, setTemplate } = useTemplate();
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);

    const template = new Template(json);
    const selected = template.selected();
    const label = buttonLabelMap[selected?.type!] || "Add Action";

    function onAdd(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const selected = template.selected();
        if (selected?.type === "select") {
            setSelectorDialogOpen(true);
        }
        else if (Object.keys(buttonLabelMap).includes(selected?.type!)) {
            template.addItem();
            setTemplate(template.json());
        }
        else {
            setActionDialogOpen(true);
        }
    }

    return (
        <Box sx={sx}>
            <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                <Typography fontSize="small">{label}</Typography>
            </Button>
            <AddActionDialog
                open={actionDialogOpen}
                onClose={() => setActionDialogOpen(false)}
            />
            <AddSelectorDialog
                open={selectorDialogOpen}
                onClose={() => setSelectorDialogOpen(false)}
            />
        </Box>
    );
}
