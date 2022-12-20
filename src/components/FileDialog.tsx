import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Input as CommitIcon } from "@mui/icons-material";
import { AlertBar, FileList, FilePathBreadcrumbs, TitleBar, TransitionUp } from ".";

export interface Props {
    files: string[];
    title: string;
    error: string;
    mode: "open" | "save";
    open: boolean;
    selectedFile?: string;
    onSelectFile: (event: React.SyntheticEvent, file: string) => void;
    onClearError: (event: React.SyntheticEvent) => void;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ files, title, mode, open, error, selectedFile, onSelectFile, onClearError, onClose }: Props) => {
    const [currentDirectory, setCurrentDirectory] = useState("");
    const [text, setText] = useState("");
    const [valid, setValid] = useState(true);

    useEffect(() => {
        setText(selectedFile && validateFilename(selectedFile) ? selectedFile : "");
        setCurrentDirectory(selectedFile && validateFilename(selectedFile) && selectedFile.lastIndexOf("/") > 0 ? selectedFile?.slice(0, selectedFile?.lastIndexOf("/") + 1) : "/");
    }, [selectedFile]);

    function handleCommit(event: React.SyntheticEvent) {
        if (valid) {
            onSelectFile(event, text);
            onClose(event);
        }
    }

    function handleSelectFile(event: React.SyntheticEvent, file: string) {
        if (mode === "open") {
            onSelectFile(event, file);
            onClose(event);
        }
        else if (mode === "save") {
            setText(file);
        }
    }

    function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.target.value;
        setText(text);
        const valid = validateFilename(text);
        setValid(valid);
    }

    function validateFilename(text: string): boolean {
        return /^[/][a-z][a-z0-9_/]+[.](yaml|json)$/.test(text);
    }

    const currentFiles = files
        .filter(file => {
            if (file.startsWith(currentDirectory) && file !== currentDirectory) {
                const name = file.slice(currentDirectory.length);
                const i = name.indexOf("/");
                if (i < 0 || name.length === i + 1)
                    return true;
            }
            return false;
        });

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title={title} onClose={onClose} />
                <AlertBar message={error} open={!!error} onClose={onClearError} />
                <FilePathBreadcrumbs file={currentDirectory} onClick={(event, key) => setCurrentDirectory(key)} sx={{ m: 2 }} />
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <FileList files={currentFiles} onSelectFile={handleSelectFile} onSelectFolder={(event, key) => setCurrentDirectory(key)} />
            </DialogContent>
            
            {mode === "save" ? (
                <DialogActions>
                    <TextField
                        type="text"
                        label=""
                        margin="dense"
                        autoFocus
                        fullWidth
                        value={text}
                        error={!valid}
                        onChange={handleTextChange}
                        variant="standard"
                        InputProps={{endAdornment:
                            <IconButton onClick={handleCommit}>
                                <CommitIcon />
                            </IconButton>
                        }}
                    />
                </DialogActions>
            ) : undefined}
        </Dialog>
    );
};