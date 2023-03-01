import React, { useState } from "react";
import { PropertyGrid, PropertyGridItem } from ".";
import { useApp } from "../context";


import {
    Link,
    Stack,
    SxProps,
    Theme,
    Tooltip,
    Typography
} from "@mui/material";

import {
    WarningAmberOutlined as AlertIcon,
    KeyboardDoubleArrowRight as MoreIcon,
    KeyboardDoubleArrowLeft as LessIcon,
} from "@mui/icons-material";

export type AppPropertyGridItem = [
    JSX.Element | string, // name
    JSX.Element | string | number | boolean, // editor
    string, // help
    boolean, // visible
    string? // alert
];

export interface Props {
    columns?: Array<{ width: number | string }>,
    items: AppPropertyGridItem[];
    sx?: SxProps<Theme>;
}

export default ({ items, ...props }: Props) => {
    const { advanced } = useApp();
    const [expanded, setExpanded] = useState(false);

    const visibleItems = items
        .filter(item => item[3] || expanded || advanced)
        .map(item => [
            (
                <Stack direction="row">
                    <Tooltip title={item[2]}>
                        <Typography fontSize="small">{item[0]}</Typography>
                    </Tooltip>
                    {item[4] && (
                        <Tooltip title={item[4]}>
                            <AlertIcon color="warning" fontSize="small" sx={{ ml: 1 }} />
                        </Tooltip>
                    )}
                </Stack>
            ),
            item[1]
        ] as PropertyGridItem);

    return (
        <Stack direction="column" alignItems="flex-start">
            <PropertyGrid
                items={visibleItems}
                {...props}
            />
            {!advanced && !expanded &&
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setExpanded(true)}
                    sx={{ margin: 1 }}
                >
                    <Tooltip title="Show advanced settings">
                        <Typography>
                            More
                            <MoreIcon fontSize="small" sx={{ position: "relative", top: 6 }} />
                        </Typography>
                    </Tooltip>
                </Link>
            }
            {!advanced && expanded &&
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setExpanded(false)}
                    sx={{ margin: 1 }}
                >
                    <Tooltip title="Hide unused advanced settings">
                        <Typography>
                            Less
                            <LessIcon fontSize="small" sx={{ position: "relative", top: 6 }} />
                        </Typography>
                    </Tooltip>
                </Link>
            }
        </Stack>
    );
}