import React, { useEffect, useState } from "react";
import { proxy } from "./lib";
import { useApp, usePage } from "./context";

import {
    Button,
    SxProps,
    Theme,
    Tooltip
} from "@mui/material";

import {
    LightbulbOutlined as TrackOffIcon,
    Lightbulb as TrackOnIcon
} from "@mui/icons-material";

export interface Props {
    onChange: (event: Event | React.SyntheticEvent, selectors: string[]) => void;
    sx?: SxProps<Theme>;
}

export default ({ onChange, sx }: Props) => {
    const { setPageTracking } = useApp();
    const { click } = usePage();
    const [tracking, setTracking] = useState(false);
    const { } = usePage();

    useEffect(() => {
        (async () => {
            try {
                const selectors = await proxy.queryTracking({
                    className: "sx-click",
                    nthOfTypeRunLimit: 3
                });
                if (selectors.length > 0 && selectors[0])
                    onChange(new Event("change"), selectors);
            }
            catch (err) {
                console.error(err);
                debugger;
            }
        })();
    }, [click]);

    useEffect(() => {
        setPageTracking(tracking);
        return () => setPageTracking(false);
    }, [tracking]);

    return (
        <Tooltip title="Click the lightbulb and then click on an element on the page to automatically suggest a selector that targets that part of the page. Use the right mouse button to avoid activating a button or link.">
            <Button
                variant={tracking ? "contained" : "outlined"}
                size="small"
                onClick={() => setTracking(!tracking)}
                sx={{ ...sx, minWidth: 48 }}
            >
                {tracking ? <TrackOnIcon fontSize="small" /> : <TrackOffIcon fontSize="small" />}
            </Button>
        </Tooltip>
    );
}