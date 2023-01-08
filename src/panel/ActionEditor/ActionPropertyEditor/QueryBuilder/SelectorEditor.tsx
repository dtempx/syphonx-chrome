import React, { useEffect, useState } from "react";
import { Autocomplete, Button, IconButton, Stack, SxProps, TextField, Theme, Tooltip } from "@mui/material";
import { LightbulbOutlined as TrackOffIcon, Lightbulb as TrackOnIcon, Visibility as ShowOutputIcon, VisibilityOff as HideOutputIcon } from "@mui/icons-material";
import * as background from "../../../../background-proxy";

export interface Props {
    value: string;
    onChange: (event: Event | React.SyntheticEvent, value: string) => void;
    sx?: SxProps<Theme>;
}

export default ({ value, onChange, ...props }: Props) => {
    const [tracking, setTracking] = useState(false);
    const [selectors, setSelectors] = useState<string[]>([]);
    const [counter, setCounter] = useState(0);
    const [output, setOutput] = useState("");
    const [showOutput, setShowOutput] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await background.selectElements([value]);
            setOutput(data.map(line => line || "").join("\n"));
        })();
        return () => {
            background.selectElements([]);
        };
    }, [value]);

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
                    setSelectors(selectors);
                    setCounter(0); // reset interval counter
                    onChange(new Event("change"), selectors[0]);
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
            <Tooltip title={tracking ? "Start tracking page clicks for CSS suggestions" : "Stop tracking page clicks for CSS suggestions"}>
                <Button
                    variant={tracking ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setTracking(!tracking)}
                    sx={{ minWidth: 48 }}
                >
                    {tracking ? <TrackOnIcon fontSize="small" /> : <TrackOffIcon fontSize="small" />}
                </Button>
            </Tooltip>
            <Autocomplete
                size="small"
                value={value}
                options={selectors}
                freeSolo
                fullWidth
                sx={{ ml: 1 }}
                renderInput={params =>
                    <TextField
                        {...params}
                        placeholder="Selector"
                        label="Selector"
                        onChange={event => onChange(event, event.target.value)}
                    />
                }
            />
            <Tooltip title={showOutput ? "Hide stage output" : "Show stage output"}>
                <IconButton onClick={() => setShowOutput(!showOutput) }>
                    {showOutput ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
                </IconButton>
            </Tooltip>
        </Stack>
        {showOutput ? (
            <TextField
                variant="outlined"
                multiline
                rows={3}
                value={output}
                sx={{
                    mt: 1,
                    width: "100%",
                    backgroundColor: "LightGray",
                    ".MuiInputBase-root": {
                        p: 0
                    },
                    ".MuiInputBase-input": {
                        p: "4px",
                        fontSize: "smaller"
                    }
                }}
            />
        ) : null}
    </>);
};