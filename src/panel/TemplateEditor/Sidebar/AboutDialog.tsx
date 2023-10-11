import React from "react";
import { TitleBar, TransitionUp } from "../components";
import icon from "../../../assets/app-icon.png";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Link,
    Table,
    TableRow,
    TableCell,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const manifest = chrome.runtime.getManifest();
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="SyphonX" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mt: 4 }}>
                <Table>
                    <TableRow>
                        <TableCell>
                            <img src={icon} width="128" />
                        </TableCell>
                        <TableCell width="100%">
                            <Typography>Version {manifest.version}</Typography>
                            <Link href="https://github.com/dtempx/syphonx-chrome" target="_blank">https://github.com/dtempx/syphonx-chrome</Link>
                        </TableCell>
                    </TableRow>
                </Table>
            </DialogContent>
        </Dialog>
    );
};