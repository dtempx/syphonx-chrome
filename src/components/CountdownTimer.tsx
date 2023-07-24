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
    sx?: SxProps<Theme>;
}

export default (props: Props) => {
    const { seconds, size, thickness, sx } = props;
    const [value, setValue] = useState(seconds);
    const progress = seconds > 0 ? 100 * value / seconds : 0;

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(prevValue => prevValue > 0 ? prevValue - 1 : prevValue);                
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [props]);

    return (
        <CircularProgress
            variant="determinate"
            size={size}
            thickness={thickness}
            value={progress}
            sx={sx}
        />
    );
}
