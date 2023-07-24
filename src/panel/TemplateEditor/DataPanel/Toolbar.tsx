import React, { useMemo } from "react";
import { useApp, useTemplate } from "./context";
import { Template } from "./lib";

import {
    Chip,
    Divider,
    IconButton,
    Stack,
    Switch,
    Tooltip
} from "@mui/material";

import {
    VerifiedUser as ContractIcon,
    ReportProblem as ErrorIcon,
    DataObject as JsonIcon,
    Troubleshoot as TroubleshootIcon,
    MapsHomeWork as PortalIcon,
    RawOn as RawIcon,
    Autorenew as RefreshIcon,
    DoDisturb as ResetIcon,
    GridOn as TableIcon
} from "@mui/icons-material";

import RunStatusRibbon from "./RunStatusRibbon";

export type DataViewMode = "table" | "json" | "contract" | "errors" | "log" | "raw" | "portal";

export interface Props {
    mode: DataViewMode;
    onChange: (event: React.SyntheticEvent<Element, Event>, mode: DataViewMode) => void;
}

export default ({ mode, onChange } : Props) => {
    const { autoRefresh, setAutoRefresh, portal } = useApp();
    const { template: json, extractState, resetExtractStatus, refresh, refreshing } = useTemplate();

    const errors = useMemo(() => extractState?.errors ? extractState.errors.length : 0, [extractState]);
    const template = new Template(json);
    const simple = template.simple();

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
                    <IconButton size="small" onClick={() => resetExtractStatus()}>
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
                <Tooltip title="contract" onClick={event => onChange(event, "contract")}>
                    <IconButton size="small" color={mode === "contract" ? "primary" : "default"}><ContractIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="log" onClick={event => onChange(event, "log")}>
                    <IconButton size="small" color={mode === "log" ? "primary" : "default"}><TroubleshootIcon fontSize="small" /></IconButton>
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
            {!!portal?.views?.panel &&
            <Stack direction="row">
                <Tooltip title="portal" onClick={event => onChange(event, "portal")}>
                    <IconButton size="small" color={mode === "portal" ? "primary" : "default"}>
                        <PortalIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
            }
            <RunStatusRibbon />
        </Stack>
    );
};