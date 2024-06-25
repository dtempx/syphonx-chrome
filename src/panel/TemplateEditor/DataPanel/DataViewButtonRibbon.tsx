import React, { useMemo } from "react";
import { useApp, useTemplate } from "./context";
import { DataViewMode } from "./DataViewMode";

import {
    Chip,
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import {
    VerifiedUser as ContractIcon,
    ReportProblem as ErrorIcon,
    DataObject as JsonIcon,
    Troubleshoot as TroubleshootIcon,
    RawOn as RawIcon,
    GridOn as TableIcon
} from "@mui/icons-material";

export interface Props {
    mode: DataViewMode;
    onChange: (event: React.SyntheticEvent<Element, Event>, mode: DataViewMode) => void;
}

export default ({ mode, onChange } : Props) => {
    const { debug } = useApp();
    const { extractState } = useTemplate();
    const errors = useMemo(() => extractState?.errors ? extractState.errors.length : 0, [extractState]);

    return (
        <Stack direction="row">
            <Tooltip title="table" onClick={event => onChange(event, "table")}>
                <IconButton size="small" color={mode === "table" ? "primary" : "default"}><TableIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="json" onClick={event => onChange(event, "json")}>
                <IconButton size="small" color={mode === "json" ? "primary" : "default"}><JsonIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="contract" onClick={event => onChange(event, "contract")}>
                <IconButton size="small" color={mode === "contract" ? "primary" : "default"}><ContractIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="log" onClick={event => onChange(event, "log")}>
                <IconButton size="small" color={mode === "log" ? "primary" : "default"}><TroubleshootIcon fontSize="small" /></IconButton>
            </Tooltip>
            {debug &&
            <Tooltip title="raw" onClick={event => onChange(event, "raw")}>
                <IconButton size="small" color={mode === "raw" ? "primary" : "default"}><RawIcon fontSize="small" /></IconButton>
            </Tooltip>
            }
            <Tooltip title="errors" onClick={event => onChange(event, "errors")}>
                <IconButton size="small" color={mode === "errors" ? "primary" : "default"}>
                    <ErrorIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            {errors > 0 && (
                <Chip
                    label={errors}
                    color="error"
                    variant="filled"
                    size="small"
                    sx={{ position: "relative", left: -10, height: 14, fontSize: "x-small" }}
                />
            )}
        </Stack>
    );
};