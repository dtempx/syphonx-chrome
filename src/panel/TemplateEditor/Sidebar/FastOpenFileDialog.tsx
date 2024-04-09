import React, { useEffect, useState } from "react";
import { useApp, useTemplate } from "./context";
import { inspectedWindow, cloud, sleep } from "./lib";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import {
    AlertBar,
    FileList,
    TitleBar,
    TransitionUp
} from "./components";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    onBrowse: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose, onBrowse }: Props) => {
    const { autoOpen, recentFiles, serviceUrl, updateRecentFiles, inspectedWindowUrl } = useApp();
    const { setTemplateFile, setTemplate, setContract, resetExtractStatus, user } = useTemplate();
    const [suggestedFiles, setSuggestedFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [opening, setOpening] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || !inspectedWindowUrl)
            return;
        (async () => {
            try {
                setSuggestedFiles([]);
                setLoading(true);
                const files = await cloud.loadTemplateDirectory({ user, serviceUrl, url: inspectedWindowUrl });
                setSuggestedFiles(files.slice(0, 50));
                setError("");
                setLoading(false);
            }
            catch (err) {
                debugger;
                setError(err instanceof Error ? err.message : JSON.stringify(err));
                setLoading(false);
            }
        })();
    }, [inspectedWindowUrl, open]);

    async function onSelectFile(event: React.SyntheticEvent, file: string): Promise<boolean> {
        try {
            setOpening(true);
            resetExtractStatus();
            const { template, contract } = await cloud.openTemplate(file, { user, serviceUrl });
            if (autoOpen) {
                const url = await template.expandUrl();
                if (url) {
                    inspectedWindow.navigate(url);
                    await sleep(1000); // give some time for page to navigate before setting template    
                }
            }

            setTemplate(template.json());
            setTemplateFile(file);
            setContract(contract || "");
            updateRecentFiles(file);

            onClose(event);
            setOpening(false);
            setError("");
            return true;
        }
        catch (err) {
            debugger;
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setOpening(false);
            return false;
        }
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Open Template" onClose={onClose} />
                <AlertBar message={error} open={!!error} onClose={() => setError("")} />
                <LinearProgress
                    sx={{
                        width: "100%",
                        visibility: loading || opening ? "visible" : "hidden"
                    }}
                />
            </DialogTitle>

            <DialogContent sx={{ p: 2, mt: 4 }}>

                <Stack>
                    <Typography variant="button" color="primary">Suggested</Typography>
                    {loading && <Typography sx={{ m: 2, fontStyle: "italic" }}>One moment please…</Typography>}
                    {!loading && suggestedFiles.length === 0 && <Typography sx={{ m: 2, fontStyle: "italic" }}>No suggestions</Typography>}
                    {!loading && suggestedFiles.length > 0 &&
                        <FileList
                            files={suggestedFiles}
                            onSelectFile={onSelectFile}
                            sx={{
                                overflowX: "hidden",
                                overflowY: "scroll",
                                maxHeight: 150
                            }}
                        />
                    }
                    <Divider sx={{ mt: 4 }} />
                </Stack>

                {recentFiles.length > 0 &&
                <Stack>
                    <Typography variant="button" color="primary">Recent</Typography>
                    <FileList
                        files={recentFiles}
                        onSelectFile={onSelectFile}
                        sx={{
                            overflowX: "hidden",
                            overflowY: "scroll",
                            maxHeight: 150
                        }}
                    />
                    <Divider sx={{ mt: 4 }} />
                </Stack>
                }

                <Button variant="outlined" onClick={onBrowse} sx={{ mt: 4 }}>Browse...</Button>
            </DialogContent>

            <DialogActions>
            </DialogActions>
        </Dialog>
    );
};