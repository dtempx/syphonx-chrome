import React, { useEffect, useState } from "react";
import { background } from "./lib";
import { useTemplate } from "./context";

import {
    Button,
    SxProps,
    Theme
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
    const { click } = useTemplate();
    const [tracking, setTracking] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const selectors = await background.queryTracking({
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
        if (tracking)
            background.enableTracking();
        else
            background.disableTracking();
        return () => {
            background.disableTracking();
        }
    }, [tracking]);

    return (
        <Button
            variant={tracking ? "contained" : "outlined"}
            size="small"
            onClick={() => setTracking(!tracking)}
            sx={{ ...sx, minWidth: 48 }}
        >
            {tracking ? <TrackOnIcon fontSize="small" /> : <TrackOffIcon fontSize="small" />}
        </Button>    
    );
}