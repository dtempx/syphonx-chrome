import React, { useState } from "react";
import { useApp } from "../context";
import { SelectQueryOp } from "syphonx-lib";

import {
    MenuItem,
    Select,
    SxProps,
    Theme,
    Tooltip,
    Typography
} from "@mui/material";

import {
    KeyboardDoubleArrowRight as ExpandIcon,
    KeyboardDoubleArrowLeft as CollapseIcon
} from "@mui/icons-material";

import functionDefs from "./functions.json";

export interface Props {
    query?: SelectQueryOp;
    onChange: (event: React.SyntheticEvent, value: SelectQueryOp) => void;
    sx?: SxProps<Theme>;
}

export default ({ query = [""], onChange, sx }: Props) => {
    const { advanced } = useApp();
    const [expanded, setExpanded] = useState(false);

    return (
        <Select
            variant="outlined"
            size="small"
            value={query[0]}
            displayEmpty
            autoWidth={false}
            renderValue={value => value || <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>(Add a stage)</Typography>}
            onChange={event => onChange(event as React.SyntheticEvent, [event.target.value as string, ...query.slice(1)])}
            sx={sx}
            MenuProps={{
                PaperProps: {
                    style: {
                        maxHeight: 5 * 48
                    }
                }
            }}
        >
            {functionDefs
                .filter(obj => advanced || expanded || !obj.advanced)
                .map(({ key, help }) => (
                    <MenuItem value={key}>
                        <Tooltip
                            arrow
                            placement="right"
                            title={help}
                        >
                            <Typography sx={{ width: "100%" }}>{key}</Typography>
                        </Tooltip>
                    </MenuItem>
                ))
            }
            {!advanced && expanded && (
                <MenuItem onClick={() => setExpanded(false)}>
                    <CollapseIcon fontSize="small" />
                    <Typography sx={{ ml: 1 }}>Less</Typography>
                </MenuItem>
            )}
            {!advanced && !expanded && (
                <MenuItem onClick={() => setExpanded(true)}>
                    <ExpandIcon fontSize="small" />
                    <Typography sx={{ ml: 1 }}>More</Typography>
                </MenuItem>
            )}
        </Select>
    );
}