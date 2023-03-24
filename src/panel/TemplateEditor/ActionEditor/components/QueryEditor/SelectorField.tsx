import React, { useEffect, useState } from "react";
import { background, cloud } from "./lib";
import { useTemplate } from "./context";

import {
    Autocomplete,
    Button,
    Chip,
    IconButton,
    Stack,
    SxProps,
    TextField,
    Theme,
    Tooltip
} from "@mui/material";

import {
    LightbulbOutlined as TrackOffIcon,
    Lightbulb as TrackOnIcon,
    Visibility as ShowOutputIcon,
    VisibilityOff as HideOutputIcon
} from "@mui/icons-material";

export interface Props {
    value: string;
    onChange: (event: Event | React.SyntheticEvent, value: string) => void;
    context?: string;
    sx?: SxProps<Theme>;
}

export default ({ value, onChange, context, ...props }: Props) => {
    const { click } = useTemplate();
    const [tracking, setTracking] = useState(false);
    const [selectors, setSelectors] = useState<string[]>([]);
    const [output, setOutput] = useState<Array<string | null>>([]);
    const [showOutput, setShowOutput] = useState(false);
    //const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const html = await background.sliceHtml(3, 3);
                if (html) {
                    const selector = await cloud.autoselect(html, context);
                    if (selector) {
                        setSelectors([selector]);
                        onChange(new Event("change"), selector);
                    }
                }
            }
            catch (err) {
                console.error(err);
                debugger;
            }
        })();
    }, [click]);

    useEffect(() => {
        if (value) {
            (async () => {
                const output = await background.selectElements([value]);
                setOutput(output);
            })();
        }
        return () => {
            background.selectElements([]);
        };
    }, [value]);

    /*
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(!value);
        }, 250);
        return () => {
            clearTimeout(timer);
        };
    }, [value]);
    */

    useEffect(() => {
        if (tracking)
            background.enableTracking();
        else
            background.disableTracking();
        return () => {
            background.disableTracking();
        }
    }, [tracking]);

    return (<>
        <Stack {...props} direction="row" spacing={0}>
            {/*
            <Tooltip
                arrow
                placement="bottom"
                open={showTooltip}
                title={!tracking ? (
                    "Click here to automatically generate a CSS selector by clicking on the page."
                ) : (
                    "Now click anywhere on the page to generate a CSS selector. You can also use the middle mouse button to avoid triggering anything on the page."
                )}
                PopperProps={{ style: { pointerEvents: "none" } }}
            >            
                <Button
                    variant={tracking ? "contained" : "outlined"}
                    size="small"
                    onClick={() => setTracking(!tracking)}
                    sx={{ minWidth: 48 }}
                >
                    {tracking ? <TrackOnIcon fontSize="small" /> : <TrackOffIcon fontSize="small" />}
                </Button>
            </Tooltip>
            */}
            <Button
                variant={tracking ? "contained" : "outlined"}
                size="small"
                onClick={() => setTracking(!tracking)}
                sx={{ minWidth: 48 }}
            >
                {tracking ? <TrackOnIcon fontSize="small" /> : <TrackOffIcon fontSize="small" />}
            </Button>
            <Autocomplete
                size="small"
                value={value}
                options={selectors}
                fullWidth={true}
                freeSolo={true}
                openOnFocus={true}
                forcePopupIcon={true}
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
            {output.length > 0 ? (
                <Chip
                    color="primary"
                    label={output.length}
                    size="small"
                    sx={{ position: "relative", top: "8px", ml: 1 }}
                />
            ) : null}
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
                value={output.map(line => line?.trim() || "").join("\n")}
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