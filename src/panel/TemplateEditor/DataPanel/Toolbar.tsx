import React, { useMemo } from "react";
import { useApp, useTemplateData } from "./context";

import {
    Chip,
    Divider,
    IconButton,
    Stack,
    Switch,
    Tooltip
} from "@mui/material";

import {
    ReportProblem as ErrorIcon,
    DataObject as JsonIcon,
    RawOn as RawIcon,
    Autorenew as RefreshIcon,
    DoDisturb as ResetIcon,
    GridOn as TableIcon
} from "@mui/icons-material";

export type DataViewMode = "table" | "json" | "errors" | "raw";

export interface Props {
    mode: DataViewMode;
    onChange: (event: React.SyntheticEvent<Element, Event>, mode: DataViewMode) => void;
}

export default ({ mode, onChange } : Props) => {
    const { autoRefresh, setAutoRefresh } = useApp();
    const { result, setResult, refresh, refreshing, simple } = useTemplateData();
    const errors = useMemo(() => result?.errors ? result.errors.length : 0, [result]);

    const spinAnimation = {
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          }
        }            
    };

    return (
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            <Stack direction="row">
                <Tooltip title={`auto-refresh${!simple ? " (disabled)" : ""}`}>
                    <Switch
                        size="small"
                        checked={autoRefresh && simple}
                        onChange={() => {
                            if (simple)
                                setAutoRefresh(!autoRefresh);
                        }}
                        sx={{ position: "relative", top: 2, mr: 1 }}
                    />
                </Tooltip>
                <Tooltip title="refresh now">
                    <IconButton size="small" onClick={() => refresh(true)}>
                        <RefreshIcon fontSize="small" sx={refreshing ? spinAnimation : undefined} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="clear">
                    <IconButton size="small" onClick={() => setResult(undefined)}>
                        <ResetIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack direction="row">
                <Tooltip title="table" onClick={event => onChange(event, "table")}>
                    <IconButton size="small" color={mode === "table" ? "primary" : "default"}><TableIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="json" onClick={event => onChange(event, "json")}>
                    <IconButton size="small" color={mode === "json" ? "primary" : "default"}><JsonIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="raw" onClick={event => onChange(event, "raw")}>
                    <IconButton size="small" color={mode === "raw" ? "primary" : "default"}><RawIcon fontSize="small" /></IconButton>
                </Tooltip>
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
        </Stack>
    );
};