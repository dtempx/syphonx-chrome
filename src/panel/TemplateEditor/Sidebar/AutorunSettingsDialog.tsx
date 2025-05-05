import React, { useState, useEffect } from "react";
import { useApp, useTemplate } from "./context";
import { parseDomain, RestApi } from "./lib";
import { AutorunWorkstreamSelect } from "./components";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Link,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";

const api = new RestApi("https://us-central1-ps-bigdata.cloudfunctions.net/syphonx-service");
const default_workstream = { workstream_id: "default", workstream_name: "default" } as Workstream;

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

interface Workstream {
    workstream_id: string;
    workstream_name: string;
}

export default ({ open, onClose }: Props) => {
    const { autorun, setAutorun, inspectedWindowUrl } = useApp();
    const { user } = useTemplate();
    const [mode, setMode] = useState<"all" | "include" | "exclude">(autorun?.mode || "all");
    const [domains, setDomains] = useState(autorun?.domains?.join("\n") || "");
    const domain = parseDomain(inspectedWindowUrl);
    const addVisible = !domains?.split("\n").includes(domain);

    const [workstreams, setWorkstreams] = React.useState<Workstream[]>([ ]);
    const [workstream, setWorkstream] = React.useState<Workstream>();

    useEffect(() => {
        if (open) {
            setMode(autorun?.mode || "all");
            setDomains(autorun?.domains?.join("\n") || "");
        }
    }, [open, autorun]);

    useEffect(() => {
        (async () => {
            if (open && !workstreams?.length) {
                const headers: Record<string, string> = { Authorization: `Bearer u/${user?.id}`, "X-Username": `${user?.email}` };
                const workstreams = await api.json("/autorun/workstreams", { headers });
                setWorkstreams(workstreams);
            }
        })();
    }, [open]);

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
        setAutorun({
            mode,
            domains: domains?.split("\n").map((value: string) => value.trim()).filter((value: string) => value.length > 0),
            workstream: workstream && workstreams.find((item: Workstream) => item.workstream_id === workstream.workstream_id)
        });
        onClose(event);
    }

    function handleAdd() {
        setDomains(`${domains}\n${domain}`.trim());
        if (mode === "all")
            setMode("include");
    }

    function handleClear() {
        setDomains("");
        setMode("all");
        setWorkstream(default_workstream);
    }

    function handleText(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.target.value || "";
        setDomains(text);
        const empty = text.trim().length === 0;
        if (!empty && mode === "all")
            setMode("include");
        else if (empty && mode !== "all")
            setMode("all");
    }

    function handleWorkstreamSelection(workstream: Workstream) {
        setWorkstream(workstream);
    }

    return (
        <Dialog open={open} onClose={onClose} sx={{ "& .MuiDialog-paper": { width: "500px" } }}>
            <DialogTitle>Autorun Settings</DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        {workstreams?.length ? <AutorunWorkstreamSelect workstreams={workstreams} onChange={handleWorkstreamSelection} /> : <></>}
                    </Stack>
                    <FormControl>
                        <RadioGroup value={mode} onChange={(event, value) => setMode(value as "all" | "include" | "exclude")}>
                            <FormControlLabel value="all" control={<Radio />} label="Include all domains" />
                            <FormControlLabel value="include" control={<Radio />} label="Include only the following domains" />
                            <FormControlLabel value="exclude" control={<Radio />} label="Exclude all but the following domains" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        value={domains}
                        onChange={handleText}
                        placeholder="Enter domain names, one per line"
                        rows={4}
                        multiline
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        {addVisible ? <Link href="#" fontSize="small" onClick={handleAdd}>Add {domain}</Link> : <span />}
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleClear}
                                sx={{ mt: 1, minWidth: "auto" }}>
                                    <Typography fontSize="small">Clear List</Typography>
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={handleSubmit}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};