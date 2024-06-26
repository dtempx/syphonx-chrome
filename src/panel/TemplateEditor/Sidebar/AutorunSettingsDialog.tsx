import React, { useState, useEffect } from "react";
import { useApp } from "./context";
import { parseDomain } from "./lib";

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

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ open, onClose }: Props) => {
    const { autorun, setAutorun, inspectedWindowUrl } = useApp();
    const [mode, setMode] = useState<"all" | "include" | "exclude">(autorun?.mode || "all");
    const [domains, setDomains] = useState(autorun?.domains?.join("\n") || "");
    const domain = parseDomain(inspectedWindowUrl);
    const addVisible = !domains.split("\n").includes(domain);

    useEffect(() => {
        if (open) {
            setMode(autorun?.mode || "all");
            setDomains(autorun?.domains?.join("\n") || "");
        }
    }, [open, autorun]);

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
        setAutorun({
            mode,
            domains: domains.split("\n").map(value => value.trim()).filter(value => value.length > 0)
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Autorun Settings</DialogTitle>
            <DialogContent sx={{ mt: 4 }}>
                <Stack direction="column">
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