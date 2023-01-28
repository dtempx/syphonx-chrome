import React from "react";
import { PropertyGrid, TitleBar, TransitionUp } from "../components";
import { useApp } from "../../context";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch
} from "@mui/material";


export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const { debug, setDebug } = useApp();
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="User Settings" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <PropertyGrid
                    columns={[{ width: 400 }]}
                    items={[
                        [
                            "Debug mode",
                            <Switch
                                checked={debug}
                                onChange={() => setDebug(!debug)}
                            />,
                            "Shows or hides additional debug info"
                        ]
                    ]}
                />
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};