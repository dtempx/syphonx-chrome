import React, { useEffect, useState } from "react";
import { Autocomplete, Button, IconButton, Stack, SxProps, TextField, Theme } from "@mui/material";
import { MyLocation as TrackIcon, Visibility as ShowOutputIcon, VisibilityOff as HideOutputIcon } from "@mui/icons-material";
import * as background from "../../../../background-proxy";

export interface Props {
    sx?: SxProps<Theme>;
}

export default ({ ...props }: Props) => {
    const [tracking, setTracking] = useState(false);
    const [selector, setSelector] = useState("");
    const [selectors, setSelectors] = useState<string[]>([]);
    const [counter, setCounter] = useState(0);
    const [output, setOutput] = useState("");
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await background.selectElements([selector]);
            setOutput(data.map(line => line || "").join("\n"));
        })();
        return () => {
            background.selectElements([]);
        };
    }, [selector]);

    useEffect(() => {
        setCounter(0);
        if (tracking)
            background.enableTracking();
        else
            background.disableTracking();

        const timer = setInterval(async () => {
            if (tracking) {
                const selectors = await background.queryTracking();
                if (selectors.length > 0) {
                    setSelector(selectors[0]);
                    setSelectors(selectors);
                    setCounter(0); // reset interval counter
                }
                else if (counter >= 60) {
                    setTracking(false); // disable tracking after 60 seconds
                }
                else {
                    setCounter(counter + 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(timer);
            background.disableTracking();
        }
    }, [tracking]);
   
    return (<>
        <Stack {...props} direction="row" spacing={0}>
            <Button
                variant={ tracking ? "contained" : "outlined" }
                size="small"
                onClick={() => setTracking(!tracking)}
                sx={{ minWidth: 48 }}
            >
                <TrackIcon fontSize="small" />
            </Button>
            <Autocomplete
                size="small"
                value={selector}
                options={selectors}
                freeSolo
                fullWidth
                sx={{ ml: 1 }}
                renderInput={params =>
                    <TextField
                        {...params}
                        placeholder="CSS Selector"
                        label="CSS Selector"
                        onChange={event => setSelector(event.target.value)}
                    />
                }
            />
            <IconButton onClick={() => setShowOutput(!showOutput) }>
                {showOutput ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
            </IconButton>
        </Stack>
        {showOutput ? (
            <TextField
                variant="outlined"
                multiline
                rows={3}
                defaultValue={output}
                sx={{ mt: 1, width: "100%", backgroundColor: "LightGray", fontSize: "small" }}
            />
        ) : null}
    </>);
};