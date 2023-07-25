import React, { useEffect, useState } from "react";

import {
    CircularProgress,
    SxProps,
    Theme
} from "@mui/material";

export interface Props {
    seconds: number;
    size?: number;
    thickness?: number;
    flip?: boolean;
    sx?: SxProps<Theme>;
    key?: string;
}

export default (props: Props) => {
    const { seconds, size, thickness, flip, sx, key = seconds } = props;
    const [value, setValue] = useState(seconds);
    const progress = seconds > 0 ? 100 * value / seconds : 0;

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prevValue => prevValue > 0 ? prevValue - 1 : prevValue);                
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [key]);

    return (
        <CircularProgress
            variant="determinate"
            size={size}
            thickness={thickness}
            value={progress}
            style={flip ? { transform: "scaleX(-1) rotate(-90deg" } : undefined}
            sx={sx}
        />
    );
}
