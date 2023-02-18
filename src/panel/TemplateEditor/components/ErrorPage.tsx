import React, { useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { cloud } from "../lib";

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

export default ({ error, resetErrorBoundary }: FallbackProps) => {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState("");
    const [sent, setSent] = useState(false);

    async function reportError() {
        setSent(true);
        await cloud.log({
            key: "error",
            comments,
            error: error.stack || error.message
        });
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
                        disabled={sent}
                        placeholder="Any additional comments to report on this error?"
                        sx={{ mt: 1 }}
                    />
                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Button
                            variant="outlined"
                            size="small"
                            disabled={sent}
                            sx={{ width: 120, mt: 1 }}
                            onClick={reportError}
                        >
                            <Typography fontSize="small">{!sent ? "Report Error" : "Thanks!"}</Typography>
                        </Button>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={resetErrorBoundary}>Start Over</Button>
                </CardActions>
            </Card>
        </Container>
    );
}