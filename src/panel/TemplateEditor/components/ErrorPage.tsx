import React, { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { LoadingButton } from "@mui/lab";
import { cloud } from "../lib";
import { useApp } from "../context";

import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    TextField,
    Typography
} from "@mui/material";

type Status = "unsent" | "sending" | "sent" | "error";

export default ({ error, resetErrorBoundary }: FallbackProps) => {
    const { email } = useApp();
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState("");
    const [status, setStatus] = useState<Status>("unsent");

    useEffect(() => {
        setExpanded(false);
        setComments("");
        setStatus("unsent");
    }, [error]);

    async function reportError() {
        const manifest = chrome.runtime.getManifest();
        setStatus("sending");
        const ok = await cloud.log({
            key: "error",
            version: manifest.version,
            error: error.stack || error.message || JSON.stringify(error),
            email,
            comments
        });
        if (ok)
            setStatus("sent");
        else
            setStatus("error");
    }

    return (
        <Container sx={{ backgroundColor: "#e7ebf0", padding: 4 }}>
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <Alert
                        variant="filled"
                        severity="error"
                        action={<Button color="inherit" size="small" onClick={() => setExpanded(!expanded)}>Details</Button>}
                    >
                        <AlertTitle>An error occurred</AlertTitle>
                        <Typography fontSize="small">Sorry about that! Please report the error or start over.</Typography>
                    </Alert>
                    {expanded && (
                        <Box sx={{ mt: 1 }}>
                            <pre style={{ height: 150, backgroundColor: "#eee", fontFamily: "monospace", fontSize: "xx-small", overflowX: "scroll", overflowY: "scroll", padding: "8px" }}>{error.stack}</pre>
                        </Box>
                    )}
                    <TextField
                        multiline
                        fullWidth
                        value={comments}
                        onChange={event => setComments(event.target.value)}
                        rows={2}
                        disabled={status !== "unsent" && status !== "error"}
                        placeholder="Any additional comments to report on this error?"
                        sx={{ mt: 1 }}
                    />
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <LoadingButton
                            variant="outlined"
                            size="small"
                            color={status === "error" ? "error" : undefined}
                            disabled={status !== "unsent" && status !== "error"}
                            loading={status === "sending"}
                            loadingPosition="end"
                            sx={{ width: 120, mt: 1 }}
                            onClick={reportError}
                        >
                            {status === "unsent" && <Typography fontSize="small">Report Error</Typography>}
                            {status === "sending" && <Typography fontSize="small">Sending…</Typography>}
                            {status === "sent" && <Typography fontSize="small">Got it!</Typography>}
                            {status === "error" && <Typography fontSize="small">Try again</Typography>}
                        </LoadingButton>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={resetErrorBoundary}>Start Over</Button>
                </CardActions>
            </Card>
        </Container>
    );
}