import React, { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { NoteAdd as FileNewIcon, FileOpen as FileOpenIcon, Save as FileSaveIcon, ManageAccounts as SettingsIcon  } from "@mui/icons-material";
import OpenFileDialog from "./OpenFileDialog";
import SaveFileDialog from "./SaveFileDialog";
import { List } from "../../components";
import { Template } from "../../lib";
import { useTemplate } from "../context";

export interface Props {
    open: boolean;
    onClose: (event: React.KeyboardEvent | React.MouseEvent | {}) => void
}

export default ({ open, onClose }: Props) => {
    const { setTemplate } = useTemplate();
    const [fileOpenOpen, setFileOpenOpen] = useState(false);
    const [fileSaveOpen, setFileSaveOpen] = useState(false);

    return (<>
        <OpenFileDialog open={fileOpenOpen} onClose={() => setFileOpenOpen(false)} />
        <SaveFileDialog open={fileSaveOpen} onClose={() => setFileSaveOpen(false)} />

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
                    ["File New", <FileNewIcon />, event => { setTemplate(new Template()); onClose(event); }],
                    ["File Open", <FileOpenIcon />, event => { setFileOpenOpen(true); onClose(event); }],
                    ["File Save", <FileSaveIcon />, event => { setFileSaveOpen(true); onClose(event); }],
                    null,
                    ["User Settings", <SettingsIcon />, event => { setFileSaveOpen(true); onClose(event); }]
                ]} />
            </Box>
        </Drawer>
    </>);
};