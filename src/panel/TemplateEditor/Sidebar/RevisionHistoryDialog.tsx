import React, { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { useApp, useTemplate } from "./context";
import { cloud } from "./lib";
import { FileMetadata } from "syphonx-lib";

import {
    AlertBar,
    DisplayDate,
    TitleBar,
    TransitionUp
} from "./components";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

import {
    CloudDownload as FileOpenIcon
} from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: {}) => void;
}

export default ({ open, onClose }: Props) => {
    const { serviceUrl, updateRecentFiles } = useApp();
    const { templateFile, resetExtractStatus, setTemplate, setTemplateFile, setTemplateRevision, setContract, user } = useTemplate();
    const [files, setFiles] = useState<FileMetadata[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || !templateFile)
            return;
        (async () => {
            try {
                setFiles([]);
                setLoading(true);
                const revisions = await cloud.loadTemplateRevisions(templateFile, { user, serviceUrl });
                setFiles(revisions);
                setError("");
                setLoading(false);
            }
            catch (err) {
                debugger;
                setError(err instanceof Error ? err.message : JSON.stringify(err));
                setLoading(false);
            }
        })();
    }, [templateFile, open]);

    async function handleOpenRevision(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: FileMetadata) {
        try {
            setLoading(true);
            resetExtractStatus();

            const { template, contract } = await cloud.openTemplate(templateFile, { user, serviceUrl }, file.revision);
            setTemplate(template.json());
            setTemplateFile(templateFile);
            setTemplateRevision(formatDate(file.modifiedAt, "Pp"));
            setContract(contract || "");
            updateRecentFiles(templateFile);

            setFiles([]);
            setLoading(false);
            onClose(event);
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setLoading(false);
        }
    }

    return (<>
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Revision History" onClose={onClose} />
                <AlertBar message={error} open={!!error} onClose={() => setError("")} />
                <LinearProgress
                    sx={{
                        width: "100%",
                        visibility: loading ? "visible" : "hidden"
                    }}
                />
            </DialogTitle>

            <DialogContent sx={{ p: 2, mt: 2 }}>
                {templateFile && <Typography color="primary" fontSize="larger">{templateFile}</Typography>}
                {loading && <Typography sx={{ fontStyle: "italic" }}>One moment please…</Typography>}
                {!loading && !templateFile && files.length === 0 && <Typography sx={{ fontStyle: "italic" }}>No revision history available</Typography>}
                {!loading && templateFile && files.length > 0 &&
                <List sx={{ mt: 2 }}>
                    {files.map(file => (
                        <ListItem
                            key={file.revision}
                            secondaryAction={
                                <Tooltip title={`Open revision ${file.revision}`}>
                                    <IconButton
                                        onClick={event => handleOpenRevision(event, file)}
                                        sx={{ color: "primary" }}
                                        disabled={loading}
                                    >
                                        <FileOpenIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <Stack direction="row">
                                <DisplayDate date={file.modifiedAt} fontSize="larger" />
                                {file.modifiedBy && <Typography fontSize="larger" fontStyle="italic" sx={{ ml: 1 }}>{file.modifiedBy}</Typography>}
                            </Stack>
                        </ListItem>
                    ))}
                    </List>}
            </DialogContent>
        </Dialog>
    </>);
};