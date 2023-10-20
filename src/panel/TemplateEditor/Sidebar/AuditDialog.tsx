import React, { useEffect, useState } from "react";
import { background, inspectedWindow } from "../lib";

import {
    TitleBar,
    TransitionUp
} from "../components";

import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

const data = [
    {
        url: "https://www.example.org/",
        targets: ["title", "description", "link"]
    },
    {
        url: "https://www.iana.org/",
        targets: ["title", "description", "search", "footer"]
    }
];

export default ({ open, onClose }: Props) => {
    const [selector, setSelector] = useState("");

    useEffect(() => {
        (async () => {
            if (open) {
                await inspectedWindow.navigate(data[0].url);
                await background.enableTracking();
                setSelector(data[0].targets[0]);
            }
            else {
                await background.disableTracking();
            }    
        })();
        return () => {
            (async () => {
                await background.disableTracking();
            })();
        };
    }, [open]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Audit" onClose={onClose} />
            </DialogTitle>

            <DialogContent>
                <Typography fontSize={18} mt={4}>Where is <b>{ selector }</b>?</Typography>
                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                    <div />
                    <Button variant="outlined" onClick={() => {}}>Not Found</Button>
                    <Button variant="outlined" onClick={() => {}}>Skip</Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};
