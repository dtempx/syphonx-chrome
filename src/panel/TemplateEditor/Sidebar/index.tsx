import React, { useState } from "react";
import { List, ListItemType } from "../components";
import { useTemplate } from "../context";

import AboutDialog from "./AboutDialog";
import AuditDialog from "./AuditDialog";
import OpenFileDialog from "./OpenFileDialog";
import FastOpenFileDialog from "./FastOpenFileDialog";
import PortalDialog from "./PortalDialog";
import SaveFileDialog from "./SaveFileDialog";
import UserSettingsDialog from "./UserSettingsDialog";
import VerificationDialog from "./VerificationDialog";

import {
    Box,
    Drawer
} from "@mui/material";

import {
    Info as AboutIcon,
    AdsClick as AuditIcon,
    NoteAdd as FileNewIcon,
    CloudDownload as FileOpenIcon,
    CloudUpload as FileSaveIcon,
    CloudOff as FileCloseIcon,
    MapsHomeWork as PortalIcon,
    ManageAccounts as SettingsIcon
} from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { portal, resetExtractStatus, setTemplate, verified } = useTemplate();
    const [dialog, setDialog] = useState("");

    const items: ListItemType[] = [
        ["New Template", <FileNewIcon />, event => {
            setTemplate("");
            resetExtractStatus();
            onClose(event);
        }],
        ["Open Template", <FileOpenIcon />, event => {
            if (!verified) {
                setDialog("verify");
                onClose(event);
            } else {
                setDialog("fast-open");
                onClose(event);
            }
        }],
        ["Save Template", <FileSaveIcon />, event => {
            if (!verified) {
                setDialog("verify");
                onClose(event);
            } else {
                setDialog("save");
                onClose(event);
            }
        }],
        ["Close Template", <FileCloseIcon />, event => {
            setTemplate("");
            resetExtractStatus();
            onClose(event);
        }],
        null,
        ["User Settings", <SettingsIcon />, event => {
            setDialog("settings");
            onClose(event);
        }],
        ["About", <AboutIcon />, event => {
            setDialog("about");
            onClose(event);
        }],
        null,
        ["Audit", <AuditIcon />, event => {
            setDialog("audit");
            onClose(event);
        }]
    ];

    if (portal?.views?.panel)
        items.push(
            ["Portal", <PortalIcon />, event => {
                setDialog("portal");
                onClose(event);
            }]
        );

    return (<>
        <AboutDialog open={dialog === "about"} onClose={() => setDialog("")} />
        <AuditDialog open={dialog === "audit"} onClose={() => setDialog("")} />
        <FastOpenFileDialog open={dialog === "fast-open"} onClose={() => setDialog("")} onBrowse={() => setDialog("open")} />
        <OpenFileDialog open={dialog === "open"} onClose={() => setDialog("")} />
        <SaveFileDialog open={dialog === "save"} onClose={() => setDialog("")} />
        <UserSettingsDialog open={dialog === "settings"} onClose={() => setDialog("")} />
        <PortalDialog open={dialog === "portal"} onClose={() => setDialog("")} />
        <VerificationDialog open={dialog === "verify"} setOpen={() => setDialog("verify")} onClose={() => setDialog("")} />

        <Drawer
            anchor="left"
            open={open}
            onClose={event => onClose(event)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={event => onClose(event)}
                onKeyDown={event => onClose(event)}
            >
                <List items={items} />
            </Box>
        </Drawer>
    </>);
};