import React, { useEffect, useState } from "react";
import * as uuid from "uuid";
import { AlertBar, TitleBar, TransitionUp } from "./components";
import { useApp, useTemplate } from "./context";
import { formatNumber, inspectedWindow, isEmpty, isEmptyDeep, RestApi, cloud } from "./lib";
import TableView from "../../TemplateEditor/DataPanel/TableView";
import RunStatusRibbon from "../../TemplateEditor/DataPanel/RunStatusRibbon";
import AutorunSettingsDialog from "./AutorunSettingsDialog";

import {
    Button,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Switch,
    Tooltip,
    Typography
} from "@mui/material";

import {
    BackHand as BlockedIcon,
    Help as UnknownIcon,
    Settings as SettingsIcon,
    Upload as PostIcon

} from "@mui/icons-material";

// const api = new RestApi("https://us-central1-ps-bigdata.cloudfunctions.net/syphonx-service");
const api = new RestApi("http://localhost:8081");

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const { runTemplate, refreshing, extractState, user } = useTemplate();
    const { autorun, setAutorun } = useApp();
    const [active, setActive] = useState(false);
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [timestamp, setTimestamp] = useState(0);
    const [status, setStatus] = useState("Stopped");
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [template, setTemplate] = useState<any>();
    const [late, setLate] = useState(false);

    const error_codes = extractState?.errors.map(error => error.code as string) || [];
    const empty = isEmptyDeep(extractState?.data);
    const blocked = error_codes.includes("blocked");
    const pnf = error_codes.includes("pnf");

    function onActiveChange(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
        setActive(value);
        if (value)
            next();
        else if (status === "Running" && !late)
            setStatus("Stopping");
        else
            setStatus("Stopped");
    }

    useEffect(() => {
        if (status === "Pausing" && !timer) {
            const value = setTimeout(() => {
                setTimer(undefined);
                next();
            }, 4000);
            setTimer(value);
        }
        else if (status === "Idle" && !timer) {
            const value = setTimeout(() => {
                setTimer(undefined);
                next();
            }, 120000);
            setTimer(value);            
        }
        else if (status === "Running" && !timer) {
            const value = setTimeout(() => {
                setTimer(undefined);
                setLate(true);
            }, 35000);
            setTimer(value);
        }
        else if (!["Pausing", "Idle", "Running"].includes(status) && timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
                setTimer(undefined);
            }
        }
    }, [status, timer]);

    useEffect(() => {
        (async () => {
            if (!open) {
                setActive(false);
                setId("");
                setError("");
                setStatus("Stopped");
                setTimestamp(0);
                setPostCount(0);
            }
            else if (!refreshing && extractState?.id === id) {
                await post();
            }
        })();
    }, [open, refreshing, extractState]);

    async function post() {
        setStatus("Posting");
        try {
            const capture_id = uuid.v4();
            const capture_date = new Date();
    
            const data = {
                capture_id,
                capture_date,
                id: extractState?.id,
                data: extractState?.data,
                url: extractState?.url,
                originalUrl: extractState?.originalUrl,
                domain: extractState?.domain,
                errors: extractState?.errors,
                version: extractState?.version,
                duration: new Date().valueOf() - timestamp
            };
            const headers: Record<string, string> = {
                "Authorization": `Bearer u/${user?.id}`,
                "X-Username": `${user?.email}`
            };

            const tab = await inspectedWindow.tab();
            const screenshot = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });
            const s3UploadInformation = await api.json<{ bucket: string; key: string; url: string; }>("/s3", { headers, params: `?capture_id=${capture_id}&capture_date=${capture_date.toString()}` }) || {};

            if (s3UploadInformation?.url) {
                await cloud.uploadScreenshot({ url: s3UploadInformation.url, data: screenshot });
            }

            await api.postJson(`/autorun?workstream=${autorun?.workstream?.workstream_id}`, { ...data, screenshot: { ...s3UploadInformation, url: s3UploadInformation?.url?.split("?")?.[0] }}, { headers });
            setPostCount(postCount + 1);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setStatus("Stopped");
            setActive(false);
        }

        if (active && empty && !blocked && !pnf)
            setStatus("Empty");
        else if (active)
            setStatus("Pausing");
        else if (refreshing && !late)
            setStatus("Stopping");
        else
            setStatus("Stopped");
    }

    async function next() {
        setStatus("Fetching");
        setError("");
        setLate(false);
        try {
            const headers: Record<string, string> = { Authorization: `Bearer u/${user?.id}`, "X-Username": `${user?.email}` };
            let params = `?workstream=${encodeURIComponent(autorun?.workstream?.workstream_id!)}`;
            if (autorun?.mode === "include" && !isEmpty(autorun.domains))
                params += `&include=${encodeURIComponent(autorun.domains!.join(","))}`;
            else if (autorun?.mode === "exclude" && !isEmpty(autorun.domains))
                params += `&exclude=${encodeURIComponent(autorun.domains!.join(","))}`;
            const template = await api.json("/autorun", { headers, params });
            if (template?.url) {
                setStatus("Running");
                setId(template.id);
                setTimestamp(new Date().valueOf());
                template.originalUrl = template.url;
                setTemplate(template);
                await runTemplate(template);
            }
            else {
                setStatus("Idle");
                setError("");
                setId("");
                setTimestamp(0);
            }
        }
        catch (err) {
            setStatus("Stopped");
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setActive(false);
        }
    }

    async function retry() {
        setStatus("Running");
        setTimestamp(new Date().valueOf());
        await runTemplate(template);
    }

    async function skip(domain: string) {
        const domains = autorun?.domains || [];
        if (!domains.includes(domain))
            domains.push(domain);
        setAutorun({ mode: "exclude", domains });
        setStatus("Pausing");
    }

    return (<>
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Autorun" onClose={onClose} />
                <AlertBar message={error} open={!!error} onClose={() => setError("")} />
            </DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                        <Stack direction="row" sx={{ mb: 1 }}>
                            <Switch size="small" checked={active} disabled={status === "Stopping"} onChange={onActiveChange} />
                            <Typography sx={{ ml: 2 }}>{status}</Typography>
                        </Stack>
                        <Stack direction="row">
                            <Chip variant="filled" color="primary" label={formatNumber(postCount)} icon={<PostIcon fontSize="small" />} size="small" sx={{ mt: 1, mr: 2 }} />
                            <Tooltip title="Settings to control which domains to gather">
                                <IconButton disabled={status !== "Stopped"} onClick={() => setSettingsOpen(true)}>
                                    <SettingsIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    {autorun?.mode === "include" && autorun.domains && autorun.domains.length > 0 && <Typography>Including only {autorun.domains.slice(0, 3).join(", ")} {autorun.domains.length > 3 ? ` (+${autorun.domains.length - 3} more)` : ""}</Typography>}
                    {autorun?.mode === "exclude" && autorun.domains && autorun.domains.length > 0 && <Typography>Excluding {autorun.domains.slice(0, 3).join(", ")} {autorun.domains.length > 3 ? ` (+${autorun.domains.length - 3} more)` : ""}</Typography>}
                    <Chip variant="outlined" color="primary" label={id} sx={{ mt: 2, mb: 2, visibility: id ? "visible" : "hidden" }} />
                    {status === "Running" && <>
                        <RunStatusRibbon />
                        {late && 
                        <Stack direction="column" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                            <Button variant="outlined" onClick={() => next()} sx={{ width: 300 }}>Next Page</Button>
                            {extractState?.domain && <Button variant="outlined" onClick={() => skip(extractState?.domain)} sx={{ width: 300 }}>Skip&nbsp;<small>{extractState.domain}</small></Button>}
                        </Stack>}
                    </>}
                    {status === "Empty" &&
                    <Stack direction="column" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                        <Typography sx={{ mb: 2 }}>No data was found on the page. If there is a CAPTCHA please solve it and choose <b>Try Again</b>, otherwise choose <b>Next Page</b> to move on to the next page.</Typography>
                        <Button variant="outlined" onClick={async () => await retry()} sx={{ width: 300 }}>Try Again</Button>
                        <Button variant="outlined" onClick={async () => await next()} sx={{ width: 300 }}>Next Page</Button>
                        {extractState?.domain && <Button variant="outlined" onClick={() => skip(extractState?.domain)} sx={{ width: 300 }}>Skip&nbsp;<small>{extractState.domain}</small></Button>}
                    </Stack>}
                    {["Pausing", "Stopping", "Stopped"].includes(status) && id && !refreshing && <>
                        <TableView />
                        {blocked && <Chip label="Blocked" variant="filled" color="error" icon={<BlockedIcon fontSize="small" />} size="small" sx={{ mt: 1, width: "fit-content" }} />}
                        {pnf && <Chip label="Page Not Found" variant="filled" color="warning" icon={<UnknownIcon fontSize="small" />} size="small" sx={{ mt: 1, width: "fit-content" }} />}
                    </>}
                </Stack>
            </DialogContent>
        </Dialog>
        <AutorunSettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>);
};
