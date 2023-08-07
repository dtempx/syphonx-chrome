import React, { useState } from "react";
import { List, ListItemType } from "../components";
import { useTemplate, useUser } from "../context";

import AboutDialog from "./AboutDialog";
import OpenFileDialog from "./OpenFileDialog";
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
    const { portal, user, verified } = useUser();
    const { setTemplate, resetExtractStatus } = useTemplate();
    const [aboutOpen, setAboutOpen] = useState(false);
    const [fileOpenOpen, setFileOpenOpen] = useState(false);
    const [fileSaveOpen, setFileSaveOpen] = useState(false);
    const [userSettingsOpen, setUserSettingsOpen] = useState(false);
    const [portalOpen, setPortalOpen] = useState(false);
    const [verificationOpen, setVerificationOpen] = useState(false);


    const items: ListItemType[] = [
        ["New Template", <FileNewIcon />, event => {
            setTemplate("");
            resetExtractStatus();
            onClose(event);
        }],
        ["Open Template", <FileOpenIcon />, event => {
            if (!user || !verified) {
                setVerificationOpen(true);
                onClose(event);
            } else {
                setFileOpenOpen(true);
                onClose(event);
            }
        }],
        ["Save Template", <FileSaveIcon />, event => {
            if (!user || !verified) {
                setVerificationOpen(true);
                onClose(event);
            } else {
                setFileSaveOpen(true);
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
            setUserSettingsOpen(true);
            onClose(event);
        }],
        ["About", <AboutIcon />, event => {
            setAboutOpen(true);
            onClose(event);
        }],
    ];
    if (portal?.views?.panel || portal?.looks?.panel) {
        items.push(null);
        items.push(
            ["Portal", <PortalIcon />, event => {
                setPortalOpen(true);
                onClose(event);
            }]
        );
    }

    return (<>
        <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
        <OpenFileDialog open={fileOpenOpen} onClose={() => setFileOpenOpen(false)} />
        <SaveFileDialog open={fileSaveOpen} onClose={() => setFileSaveOpen(false)} />
        <UserSettingsDialog open={userSettingsOpen} onClose={() => setUserSettingsOpen(false)} />
        {(!!portal?.views?.full || !!portal?.looks?.full) && <PortalDialog open={portalOpen} onClose={() => setPortalOpen(false)} />}
        <VerificationDialog open={verificationOpen} setOpen={setVerificationOpen} onClose={() => setVerificationOpen(false)} />

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