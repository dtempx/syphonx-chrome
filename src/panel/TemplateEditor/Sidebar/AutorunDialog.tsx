import React, { useEffect, useState } from "react";
import { TitleBar, TransitionUp } from "./components";
import { useApp, useTemplate } from "./context";
import { isEmpty, isDeeplyEmpty, RestApi } from "./lib";
import { AlertBar } from "./components";
import TableView from "../../TemplateEditor/DataPanel/TableView";
import RunStatusRibbon from "../../TemplateEditor/DataPanel/RunStatusRibbon";
import AutorunSettingsDialog from "./AutorunSettingsDialog";

import {
    Button,
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
    Settings as SettingsIcon
} from "@mui/icons-material";

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
    const [delayed, setDelayed] = useState(false);

    const showData = status === "Pausing" || (["Stopping", "Stopped"].includes(status) && id);

    function onActiveChange(event: React.ChangeEvent<HTMLInputElement>, value: boolean) {
        setActive(value);
        if (value)
            next();
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
                setDelayed(true);
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
        if (!open) {
            setActive(false);
            setId("");
            setError("");
            setStatus("Stopped");
            setTimestamp(0);
            setPostCount(0);
        }
        else if (!refreshing && extractState?.id === id) {
            post();
        }
    }, [open, refreshing, extractState]);

    async function post() {
        setStatus("Posting");
        const data = {
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
        try {
            await api.postJson("/autorun", data, { headers });
            setPostCount(postCount + 1);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : JSON.stringify(err));
            setStatus("Stopped");
            setActive(false);
        }

        const error_codes = extractState?.errors.map(error => error.code as string) || [];
        const empty = isDeeplyEmpty(extractState?.data);
        const blocked = error_codes.includes("blocked");
        const pnf = error_codes.includes("pnf");
        if (active && empty && !blocked && !pnf)
            setStatus("Empty");
        else if (active)
            setStatus("Pausing");
        else if (refreshing)
            setStatus("Stopping");
        else
            setStatus("Stopped");
    }

    async function next() {
        setStatus("Fetching");
        setError("");
        setDelayed(false);
        try {
            const headers: Record<string, string> = { Authorization: `Bearer u/${user?.id}`, "X-Username": `${user?.email}` };
            let params = undefined;
            if (autorun?.mode === "include" && !isEmpty(autorun.domains))
                params = `?include=${encodeURIComponent(autorun.domains!.join(","))}`;
            else if (autorun?.mode === "exclude" && !isEmpty(autorun.domains))
                params = `?exclude=${encodeURIComponent(autorun.domains!.join(","))}`;
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
                setActive(false);
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" sx={{ mb: 1 }}>
                            <Switch size="small" checked={active} onChange={onActiveChange} />
                            <Typography sx={{ ml: 2 }}>{status}</Typography>
                        </Stack>
                        <Stack direction="row">
                            <Typography sx={{ mt: 1, mr: 2 }}>{postCount} posted</Typography>
                            <Tooltip title="Settings">
                                <IconButton onClick={() => setSettingsOpen(true)}>
                                    <SettingsIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    {autorun?.mode === "include" && autorun.domains && autorun.domains.length > 0 && <Typography>Including only {autorun.domains.slice(0, 3).join(", ")} {autorun.domains.length > 3 ? ` (+${autorun.domains.length - 3} more)` : ""}</Typography>}
                    {autorun?.mode === "exclude" && autorun.domains && autorun.domains.length > 0 && <Typography>Excluding {autorun.domains.slice(0, 3).join(", ")} {autorun.domains.length > 3 ? ` (+${autorun.domains.length - 3} more)` : ""}</Typography>}
                    <Typography sx={{ mt: 2, mb: 2 }}>{id}</Typography>
                    <RunStatusRibbon />
                    {showData && <TableView />}
                    {status === "Empty" &&
                    <Stack direction="column" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                        <Typography sx={{ mb: 2 }}>No data was found on the page. If there is a CAPTCHA please solve it and choose <b>Try Again</b>, otherwise choose <b>Next Page</b> to move on to the next page.</Typography>
                        <Button variant="outlined" onClick={() => retry()} sx={{ width: 300 }}>Try Again</Button>
                        <Button variant="outlined" onClick={() => next()} sx={{ width: 300 }}>Next Page</Button>
                        {extractState?.domain && <Button variant="outlined" onClick={() => skip(extractState?.domain)} sx={{ width: 300 }}>Skip&nbsp;<small>{extractState.domain}</small></Button>}
                    </Stack>}
                    {status === "Running" && delayed &&
                    <Stack direction="column" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                        <Button variant="outlined" onClick={() => next()} sx={{ width: 300 }}>Next Page</Button>
                        {extractState?.domain && <Button variant="outlined" onClick={() => skip(extractState?.domain)} sx={{ width: 300 }}>Skip&nbsp;<small>{extractState.domain}</small></Button>}
                    </Stack>}
                </Stack>
            </DialogContent>
        </Dialog>
        <AutorunSettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>);
};
