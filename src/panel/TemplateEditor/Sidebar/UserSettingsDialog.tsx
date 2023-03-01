import React from "react";
import { PropertyGrid, TitleBar, TransitionUp } from "../components";
import { useApp } from "../context";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
    Tooltip,
    Typography
} from "@mui/material";


export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const {
        advanced,
        setAdvanced,
        autoOpen,
        setAutoOpen,
        debug,
        setDebug
    } = useApp();
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
                            <Tooltip title="Automatically opens the template default URL if enabled.">
                                <Typography>Auto-open template default URL</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={autoOpen}
                                onChange={() => setAutoOpen(!autoOpen)}
                            />
                            
                        ],
                        [
                            <Tooltip title="Shows or hides advanced settings.">
                                <Typography>Advanced mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={advanced}
                                onChange={() => setAdvanced(!advanced)}
                            />
                        ],
                        [
                            <Tooltip title="Shows or hides additional debug info.">
                                <Typography>Debug mode</Typography>
                            </Tooltip>,
                            <Switch
                                size="small"
                                checked={debug}
                                onChange={() => setDebug(!debug)}
                            />
                        ]
                    ]}
                />
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};