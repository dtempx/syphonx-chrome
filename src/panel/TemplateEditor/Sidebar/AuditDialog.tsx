import React, { useEffect, useState } from "react";

import {
    inspectedWindow,
    proxy
} from "./lib";

import {
    useApp,
    usePage,
    useAudit,
    AuditProvider
} from "./context";

import {
    TitleBar,
    TransitionUp
} from "../components";

import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Stack,
    Step,
    Stepper,
    StepLabel,
    Tooltip,
    Typography
} from "@mui/material";

import {
    ThumbDown as ThumbDownIcon
} from "@mui/icons-material";

export interface Props {
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
}

const AuditDialog = ({ open, onClose }: Props) => {
    const { setPageTracking, inspectedWindowUrl } = useApp();
    const { audit, setAudit, nextAudit, status, error } = useAudit();
    const { click } = usePage();
    const [selector, setSelector] = useState("");

    const target = audit?.selectors.find(target => !target.selector && !target.status);
    const disabled = status !== "ready";

    useEffect(() => {
        if (open) {
            setPageTracking(true);
            setSelector("");
            nextAudit();
        }
        else {
            setPageTracking(false);
            setSelector("");
            setAudit(undefined);
        }
        return () => setPageTracking(false);
    }, [open]);

    useEffect(() => {
        if (audit) {
            if (audit.url !== inspectedWindowUrl)
                inspectedWindow.navigate(audit.url);
        }
    }, [audit]);

    useEffect(() => {           
        (async target => {
            const [selector] = await proxy.querySelectorPath(".sx-click");
            if (click?.shiftKey === true) {
                if (target) {
                    if (!target.alt_clicks)
                        target.alt_clicks = [];
                    target.alt_clicks.push(selector);
                }
                return; // do nothing if shift key is down
            }
            setSelector(selector);
        })(target);
    }, [click]);

    useEffect(() => {
        if (audit && target && selector) {
            (async (audit, target) => {
                await proxy.deselectElements("sx-click"); // remove hilights before taking screenshot

                const tab = await inspectedWindow.tab();
                const { html, linenums } = await proxy.sliceHtml({ selector, up: 6, down: 3 });
                const [ screenshot_rect ] = await proxy.boundingClientRect("body");

                target.selector = selector;
                target.html = html;
                target.html_linenums = linenums;
                target.text = await proxy.queryText(selector);
                target.screenshot = await chrome.tabs.captureVisibleTab(tab.windowId, { format: "png" });
                target.screenshot_rect = screenshot_rect;
                target.selector_rect = await proxy.boundingClientRect(selector);

                if (!audit.html)
                    audit.html = await proxy.queryHtml();

                setAudit({ ...audit });
                setSelector("");
            })(audit, target);
        }
    }, [selector]);

    function handleButtonClick(status: string, all: boolean) {
        if (audit && target) {
            if (!all)
                target.status = status;
            else
                audit.status = status;
            setAudit({ ...audit });
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
                <TitleBar title="Audit" onClose={onClose} />
                {error && <Alert severity="error" sx={{ width: "100%" }}>{error}</Alert>}
                <LinearProgress sx={{ width: "100%", visibility: ["serving", "submitting"].includes(status!) ? "visible" : "hidden" }} />
            </DialogTitle>

            <DialogContent>
                {status === "serving" && !audit && <Typography fontSize={18} mt={4}>One moment please...</Typography>}
                {status === "empty" && <Typography fontSize={18} mt={4}>Queue empty, check back later.</Typography>}
                {audit && target?.name &&
                <Box>
                    <Typography fontSize={18} mt={4}>{audit.name}</Typography>

                    <Stepper orientation="vertical" connector={null} activeStep={audit.selectors.indexOf(target)} sx={{ mt: 1 }}>
                        {audit.selectors.map(target => (
                            <Step key={target.name}>
                                <StepLabel>{target.name}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                        <Stack direction="row">
                            <Tooltip title="Select this option if there is a page not found error or if the page is otherwise not the kind of page that is expected">
                                <Button variant="outlined" disabled={disabled} onClick={() => handleButtonClick("bad-page", true)} sx={{ mr: 1 }}><ThumbDownIcon fontSize="small" /></Button>
                            </Tooltip>
                        </Stack>
                        <Tooltip title="Select this option if unable to find this selector on the page">
                            <Button variant="outlined" disabled={disabled} onClick={() => handleButtonClick("not-found", false)}>Not Found</Button>
                        </Tooltip>
                        <Tooltip title="Select this option to skip this selector">
                            <Button variant="outlined" disabled={disabled} onClick={() => handleButtonClick("skip", false)}>Skip</Button>
                        </Tooltip>
                        <Tooltip title="Select this option to goto the next page">
                            <Button variant="outlined" disabled={disabled} onClick={() => handleButtonClick("skip-all", true)}>Next</Button>
                        </Tooltip>
                    </Stack>

                    {status === "submitting" && <Typography fontSize={18} mt={4}>Submitting...</Typography>}
                    {status === "serving" && <Typography fontSize={18} mt={4}>Serving...</Typography>}
                </Box>
                }
            </DialogContent>
        </Dialog>
    );
};

export default (props: Props) => (
    <AuditProvider>
        <AuditDialog {...props} />
    </AuditProvider>
);
