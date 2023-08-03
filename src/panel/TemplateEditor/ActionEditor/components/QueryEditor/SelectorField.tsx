import React, { useState } from "react";
import { usePage } from "./context";
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
    const [showOutput, setShowOutput] = useState(false);
    const { html, output, selectors, setSelectors } = usePage();

    return (
        <Stack direction="column" {...props}>
            <Stack direction="row" spacing={0}>
                <TrackButton
                    onChange={(event, selectors) => {
                        setSelectors(selectors);
                        onChange(event, selectors[0]);
                    }}
                />
                <Tooltip title="A CSS selector that targets the element to match for extracting data. Click on the lightbulb to the left to automatically suggest a selector. Use '.' to match the parent element if nested within a parent select.">
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
                </Tooltip>

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