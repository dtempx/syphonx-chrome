import React, { useState, useEffect } from "react";

import {
    AlertBar,
    FileList,
    FilePathBreadcrumbs,
    TitleBar,
    TransitionUp
} from ".";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";

import {
    LoadingButton
} from "@mui/lab"

import {
    CloudUpload as SaveIcon
} from "@mui/icons-material";

export interface Props {
    files: string[];
    title: string | JSX.Element;
    error: string | JSX.Element;
    mode: "open" | "save";
    open: boolean;
    loading?: boolean;
    opening?: boolean;
    saving?: boolean;
    selectedFile?: string;
    onSelectFile: (event: React.SyntheticEvent, file: string) => void;
    onClearError: (event: React.SyntheticEvent) => void;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ files, title, mode, open, loading, opening, saving, error, selectedFile, onSelectFile, onClearError, onClose }: Props) => {
    const [currentDirectory, setCurrentDirectory] = useState("");
    const [text, setText] = useState("");
    const [valid, setValid] = useState(true);

    useEffect(() => {
        setText(selectedFile && validateFilename(selectedFile) ? selectedFile : "");
        setCurrentDirectory(selectedFile && validateFilename(selectedFile) && selectedFile.lastIndexOf("/") > 0 ? selectedFile?.slice(0, selectedFile?.lastIndexOf("/") + 1) : "/");
    }, [selectedFile]);

    function handleSave(event: React.SyntheticEvent) {
        if (valid)
            onSelectFile(event, text);
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
                <LinearProgress
                    sx={{
                        width: "100%",
                        visibility: loading || opening || saving ? "visible" : "hidden"
                    }}
                />
                {files.length === 0 && <Typography sx={{ m: 2 }}>One moment please…</Typography>}
                {files.length > 0 && <FilePathBreadcrumbs file={currentDirectory} onClick={(event, key) => setCurrentDirectory(key)} sx={{ m: 2 }} />}
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <FileList
                    files={currentFiles}
                    onSelectFile={handleSelectFile}
                    onSelectFolder={(event, key) => setCurrentDirectory(key)}
                />
            </DialogContent>
            
            {mode === "save" ? (
                <DialogActions>
                    <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        label=""
                        margin="dense"
                        autoFocus
                        fullWidth
                        value={text}
                        error={!valid}
                        onChange={handleTextChange}
                    />
                    <LoadingButton
                        variant="contained"
                        disabled={!valid}
                        loading={saving}
                        endIcon={<SaveIcon />}
                        loadingPosition="end"
                        onClick={handleSave}
                        sx={{ ml: 1 }}
                    >
                        <Typography>Save</Typography>
                    </LoadingButton>
                </DialogActions>
            ) : undefined}
        </Dialog>
    );
};