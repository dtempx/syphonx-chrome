import React, { useEffect, useState } from "react";
import { background } from "./lib";
import { TrackButton } from "./components";
import SelectorOutput from "./SelectorOutput";

import {
    Autocomplete,
    Chip,
    IconButton,
    Stack,
    SxProps,
    TextField,
    Theme,
    Tooltip
} from "@mui/material";

import {
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
    const [selectors, setSelectors] = useState<string[]>([]);
    const [output, setOutput] = useState<Array<string | null>>([]);
    const [showOutput, setShowOutput] = useState(false);
    const [html, setHtml] = useState("");
    //const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        if (value) {
            (async () => {
                const output = await background.selectElements({
                    selectors: [value],
                    className: "sx-select"
                });
                setOutput(output);

                const html = await background.sliceHtml({
                    selector: ".sx-select",
                    up: 6,
                    down: 3
                });
                setHtml(html);
            })();
        }
        return () => {
            background.selectElements({
                selectors: [],
                className: "sx-select"
            });
        };
    }, [value]);

    return (
        <Stack direction="column" {...props}>
            <Stack direction="row" spacing={0}>
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
                <TrackButton
                    onChange={(event, selectors) => {
                        setSelectors(selectors);
                        onChange(event, selectors[0]);
                    }}
                />
                <Autocomplete
                    freeSolo
                    forcePopupIcon
                    fullWidth
                    openOnFocus
                    size="small"
                    value={value}
                    options={selectors}
                    sx={{ ml: 1 }}
                    filterOptions={() => selectors}
                    renderInput={params =>
                        <TextField
                            {...params}
                            placeholder="Selector"
                            label="Selector"
                            onChange={event => onChange(event, event.target.value)}
                        />
                    }
                />
                {value && (
                    <Chip
                        color="primary"
                        label={output.length}
                        size="small"
                        sx={{
                            position: "relative",
                            top: "8px",
                            ml: 1
                        }}
                    />
                )}
                <Tooltip title={showOutput ? "Hide stage output" : "Show stage output"}>
                    <IconButton onClick={() => setShowOutput(!showOutput) }>
                        {showOutput ? <ShowOutputIcon fontSize="small" /> : <HideOutputIcon fontSize="small" />}
                    </IconButton>
                </Tooltip>
            </Stack>
            {showOutput && (
                <SelectorOutput
                    output={output}
                    html={html}
                />
            )}
        </Stack>
    );
};