import React from "react";
import { useApp, useTemplate } from "./context";
import { Template } from "./lib";
import { SxSpin } from "./components";

import {
    Divider,
    IconButton,
    Stack,
    Switch,
    Tooltip
} from "@mui/material";

import {
    MapsHomeWork as PortalIcon,
    Autorenew as RefreshIcon,
    DoDisturb as ResetIcon
} from "@mui/icons-material";

import RunStatusRibbon from "./RunStatusRibbon";
import DataViewButtonRibbon from "./DataViewButtonRibbon";
import { DataViewMode } from "./DataViewMode";

export interface Props {
    mode: DataViewMode;
    onChange: (event: React.SyntheticEvent<Element, Event>, mode: DataViewMode) => void;
}

export default ({ mode, onChange } : Props) => {
    const { autoRefresh, setAutoRefresh } = useApp();
    const { template: json, portal, resetExtractStatus, refresh, refreshing } = useTemplate();

    const template = new Template(json);
    const simple = template.simple();

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
                        <RefreshIcon fontSize="small" sx={refreshing ? SxSpin : undefined} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="clear">
                    <IconButton size="small" onClick={() => resetExtractStatus()}>
                        <ResetIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
            <DataViewButtonRibbon mode={mode} onChange={onChange} />
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