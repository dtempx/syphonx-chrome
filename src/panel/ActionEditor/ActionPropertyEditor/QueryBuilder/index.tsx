import React, { useState } from "react";
import * as syphonx from "syphonx-lib";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Pagination, Stack, Tooltip, Typography } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { TitleBar, TransitionUp } from "../../../../components";
import { clone } from "../../../../lib";
import ActionIcon from "../../ActionIcon";
import FunctionEditor from "./FunctionEditor/index";
import RawQueryEditor from "./RawQueryEditor";
import SelectorEditor from "./SelectorEditor";

export interface Props {
    select: syphonx.Select;
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery[] | undefined) => void;
}

export default ({ select, open, onClose, onChange }: Props) => {
    const [queries, setQueries] = useState<syphonx.SelectQuery[]>(select.query || [[""]]);
    const [index, setIndex] = useState(0);

    function onAddQuery() {
        const newValue = clone(queries);
        newValue.push([""]);
        setQueries(newValue);
        setIndex(newValue.length - 1);
    }

    function onDeleteQuery() {
        const newValue = clone(queries);
        newValue.splice(index, 1);
        setQueries(newValue);
        setIndex(index - 1);
    }

    function onRawQueryChanged(event: React.SyntheticEvent, query: syphonx.SelectQuery) {
        const newValue = clone(queries);
        newValue[index] = query;
        setQueries(newValue);
    }

    function onSelectorChanged(event: Event | React.SyntheticEvent, value: string) {
        const newValue = clone(queries);
        newValue[index][0] = value;
        setQueries(newValue);
    }

    function onCommit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChange(event, queries);
        onClose(event);
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            sx={{ minWidth: 600 }}
            TransitionComponent={TransitionUp}
        >
            <DialogTitle sx={{ p: 0 }}>
                <TitleBar title="Query Builder" onClose={onClose} />
            </DialogTitle>

            <DialogContent sx={{ mt: 2 }}>
                <Box
                    style={{ width: "100%" }}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        p: 1,
                        m: 1
                    }}
                >
                    <Stack direction="row">
                        <ActionIcon name={select.type || "string"} sx={{ color: "primary.light", position: "relative", top: "4px" }} />
                        <Typography variant="caption" fontSize="large" sx={{ ml: 1 }}>{select.name || "(array)"}</Typography>
                        {select.repeated ? <ActionIcon name="repeated" sx={{ color: "primary.light", ml: 1, position: "relative", top: "4px" }} /> : null}
                    </Stack>
                    <Stack direction="row">
                        <Tooltip title="Switches between query alternates">
                            <Pagination
                                size="small"
                                color="primary"
                                count={queries.length}
                                page={index + 1}
                                onChange={(_, page) => setIndex(page - 1)}
                                sx={{ position: "relative", top: "2px" }}
                            />
                        </Tooltip>
                        <Tooltip title="Add an alternate query">
                            <IconButton size="small" onClick={onAddQuery}><AddIcon fontSize="small" /></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete this alternate query">
                            <IconButton size="small" disabled={queries.length <= 1} onClick={onDeleteQuery}><DeleteIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                <Divider sx={{ mt: 1, mb: 2 }} />
                <SelectorEditor value={queries[index][0]} onChange={(event, value) => onSelectorChanged(event, value)} />
                <FunctionEditor sx={{ mt: 1 }} />
            </DialogContent>

            <DialogActions>
                <Tooltip title="Edit the raw jQuery code, or copy/paste a jQuery expression here">
                    <RawQueryEditor query={queries[index]} onChange={onRawQueryChanged} />
                </Tooltip>
                <Stack direction="row" spacing={0} justifyContent="end">
                    <Button variant="outlined" onClick={event => onClose(event)}>Cancel</Button>
                    <Button variant="contained" sx={{ ml: 1 }} onClick={onCommit}>OK</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};