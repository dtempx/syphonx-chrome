import React, { useState } from "react";
import { List } from "../components";
import { useTemplate } from "../context";
import OpenFileDialog from "./OpenFileDialog";
import SaveFileDialog from "./SaveFileDialog";
import UserSettingsDialog from "./UserSettingsDialog";

import {
    Box,
    Drawer
} from "@mui/material";

import {
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
    const [fileOpenOpen, setFileOpenOpen] = useState(false);
    const [fileSaveOpen, setFileSaveOpen] = useState(false);
    const [userSettingsOpen, setUserSettingsOpen] = useState(false);

    return (<>
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
                    ["New Template", <FileNewIcon />, event => { setTemplate(""); onClose(event); }],
                    ["Open Template", <FileOpenIcon />, event => { setFileOpenOpen(true); onClose(event); }],
                    ["Save Template", <FileSaveIcon />, event => { setFileSaveOpen(true); onClose(event); }],
                    ["Close Template", <FileCloseIcon />, event => { setTemplate(""); onClose(event); }],
                    null,
                    ["User Settings", <SettingsIcon />, event => { setUserSettingsOpen(true); onClose(event); }]
                ]} />
            </Box>
        </Drawer>
    </>);
};