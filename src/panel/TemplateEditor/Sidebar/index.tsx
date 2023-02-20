import React, { useState } from "react";
import { List } from "../components";
import { useTemplate, useTemplateData } from "../context";

import AboutDialog from "./AboutDialog";
import OpenFileDialog from "./OpenFileDialog";
import SaveFileDialog from "./SaveFileDialog";
import UserSettingsDialog from "./UserSettingsDialog";

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
    ManageAccounts as SettingsIcon 
} from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { setTemplate } = useTemplate();
    const { setResult } = useTemplateData();
    const [aboutOpen, setAboutOpen] = useState(false);
    const [fileOpenOpen, setFileOpenOpen] = useState(false);
    const [fileSaveOpen, setFileSaveOpen] = useState(false);
    const [userSettingsOpen, setUserSettingsOpen] = useState(false);

    return (<>
        <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
        <OpenFileDialog open={fileOpenOpen} onClose={() => setFileOpenOpen(false)} />
        <SaveFileDialog open={fileSaveOpen} onClose={() => setFileSaveOpen(false)} />
        <UserSettingsDialog open={userSettingsOpen} onClose={() => setUserSettingsOpen(false)} />

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
                <List items={[
                    ["New Template", <FileNewIcon />, event => {
                        setTemplate("");
                        setResult(undefined);
                        onClose(event);
                    }],
                    ["Open Template", <FileOpenIcon />, event => {
                        setFileOpenOpen(true);
                        onClose(event);
                    }],
                    ["Save Template", <FileSaveIcon />, event => {
                        setFileSaveOpen(true);
                        onClose(event);
                    }],
                    ["Close Template", <FileCloseIcon />, event => {
                        setTemplate("");
                        setResult(undefined);
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
                    }]
                ]} />
            </Box>
        </Drawer>
    </>);
};