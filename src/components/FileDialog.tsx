import React, { useState, useEffect } from "react";
import { path, regexp } from "../lib";

import {
    Alert,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    LoadingButton
} from "@mui/lab"

import {
    Clear as ClearIcon,
    CloudUpload as SaveIcon,
    FilterAltOutlined as FilterIcon
} from "@mui/icons-material";

import {
    AlertBar,
    FileList,
    FilePathBreadcrumbs,
    TitleBar,
    TransitionUp
} from ".";

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
    onSelectFile: (event: React.SyntheticEvent, file: string) => Promise<boolean>;
    onClearError: (event: React.SyntheticEvent) => void;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ files, title, mode, open, loading, opening, saving, error, selectedFile, onSelectFile, onClearError, onClose }: Props) => {
    const [currentDirectory, setCurrentDirectory] = useState("");
    const [text, setText] = useState("");
    const [valid, setValid] = useState(true);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        setText(selectedFile && validateFilename(selectedFile) ? selectedFile : "");
        setCurrentDirectory(selectedFile && validateFilename(selectedFile) && selectedFile.lastIndexOf("/") > 0 ? selectedFile?.slice(0, selectedFile?.lastIndexOf("/") + 1) : "/");
    }, [selectedFile]);

    function handleSave(event: React.SyntheticEvent) {
        if (valid)
            onSelectFile(event, text);
    }

    async function handleSelectFile(event: React.SyntheticEvent, file: string): Promise<void> {
        if (mode === "open") {
            const ok = await onSelectFile(event, file);
            if (ok)
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
        return regexp.filepath.test(text);
    }

    const currentFiles = files
        // narrow down to files in current directory
        .filter(file => {
            if (file.startsWith(currentDirectory) && file !== currentDirectory) {
                const name = file.slice(currentDirectory.length);
                const i = name.indexOf("/");
                if (i < 0 || name.length === i + 1)
                    return true;
            }
            return false;
        })
        // only include files that match the filter
        .filter(file => !filter || path.filename(file).includes(filter));

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
                {files.length === 0 &&
                    <Typography sx={{ m: 2 }}>One moment please…</Typography>
                }
                {files.length > 0 &&
                    <FilePathBreadcrumbs
                        file={currentDirectory}
                        onClick={(event, key) => {
                            setCurrentDirectory(key);
                            setFilter("");
                        }}
                        sx={{ m: 2 }}
                    />
                }
                {!loading &&
                    <Stack direction="row" sx={{ m: 2 }}>
                        <TextField
                            variant="standard"
                            placeholder="Type here to filter the current view"
                            size="small"
                            fullWidth
                            value={filter}
                            onChange={event => setFilter(event.target.value)}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton edge="start">
                                    <FilterIcon />
                                    </IconButton>
                                </InputAdornment>
                                ),
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setFilter("")}>
                                    <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                        />
                        <Chip
                            label={currentFiles.length}
                            color="primary"
                            variant="filled"
                            size="small"
                            sx={{ ml: 2 }}
                        />
                    </Stack>
                }
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <FileList
                    files={currentFiles}
                    onSelectFile={handleSelectFile}
                    onSelectFolder={(event, file) => {
                        setCurrentDirectory(file);
                        setFilter("");
                    }}
                />
                {currentFiles.length === 0 && filter && <Alert severity="info" sx={{ m: 2 }}>No files match the filter.</Alert>}
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