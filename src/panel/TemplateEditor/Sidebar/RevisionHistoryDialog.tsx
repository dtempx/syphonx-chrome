import React, { useEffect, useState } from "react";
import { useApp, useTemplate } from "./context";
import { cloud } from "./lib";
import { FileMetadata } from "syphonx-lib";

import {
    AlertBar,
    ConfirmDialog,
    TitleBar,
    TransitionUp
} from "./components";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    LinearProgress,
    MenuList,
    MenuItem,
    Stack,
    Typography
} from "@mui/material";

export interface Props {
    open: boolean;
    onClose: (event: {}) => void;
}

export default ({ open, onClose }: Props) => {
    const { serviceUrl } = useApp();
    const { templateFile, closeTemplate, resetExtractStatus, user } = useTemplate();
    const [revisions, setRevisions] = useState<FileMetadata[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedRevision, setSelectedRevision] = useState("");

    useEffect(() => {
        if (!open || !templateFile)
            return;
        (async () => {
            try {
                setRevisions([]);
                setLoading(true);
                const revisions = await cloud.loadTemplateRevisions(templateFile, { user, serviceUrl });
                setRevisions(revisions);
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

    function selectFile(key: string) {
        setSelectedRevision(key);
        setConfirmDialogOpen(true);
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
                {!loading && !templateFile && revisions.length === 0 && <Typography sx={{ fontStyle: "italic" }}>No revision history available</Typography>}
                {!loading && templateFile && revisions.length > 0 &&
                <Stack>
                    <Typography sx={{ fontStyle: "italic" }}>Select a revision below to rollback to…</Typography>
                    <MenuList sx={{ mt: 2 }}>
                        {revisions.map(revision => (
                            <MenuItem key={revision.key} onClick={event => selectFile(revision.key!)}>
                                <Typography fontSize="larger">{revision.modifiedAt?.toString()}{revision.modifiedBy ? ` by ${revision.modifiedBy}` : ""}</Typography>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Stack>}
            </DialogContent>
        </Dialog>

        <ConfirmDialog
            title="Confirm Rollback"
            message={<>Are you sure you want to rollback revision {templateFile}@{selectedRevision}?<br />This will close the active template and you'll have to reopen it.</>}
            open={confirmDialogOpen}
            onClose={(event, confirmed) => {
                setConfirmDialogOpen(false);
                if (confirmed)
                    (async () => {
                        try {
                            setLoading(true);
                            await cloud.rollbackTemplateRevision(templateFile!, selectedRevision, { user, serviceUrl });
                            setRevisions([]);
                            setLoading(false);
                            onClose(event);
                            closeTemplate();
                            resetExtractStatus();
                        }
                        catch (err) {
                            debugger;
                            setError(err instanceof Error ? err.message : JSON.stringify(err));
                            setLoading(false);
                        }
                    })();                    
            }}
        />
    </>);
};