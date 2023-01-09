import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { TitleBar, TransitionUp } from "../../../../components";
import { clone } from "../../../../lib";
import ActionIcon from "../../ActionIcon";
import FunctionEditor from "./FunctionEditor/index";
import RawQueryEditor from "./RawQueryEditor";
import SelectorEditor from "./SelectorEditor";
import QueryPager from "./QueryPager";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";

export interface Props {
    select: syphonx.Select;
    open: boolean;
    onClose: (event: React.SyntheticEvent) => void;
    onChange: (event: React.SyntheticEvent, query: syphonx.SelectQuery[] | undefined) => void;
}

export default ({ select, open, onClose, onChange }: Props) => {
    const [selects, setSelects] = useState<syphonx.SelectQuery[]>([[""]]);
    const [index, setIndex] = useState(0);

    useEffect(() =>
        setSelects(select.query || [[""]]),
    [select]);

    function onAddQuery() {
        const newValue = clone(selects);
        newValue.push([""]);
        setSelects(newValue);
        setIndex(newValue.length - 1);
    }

    function onDeleteQuery() {
        const newValue = clone(selects);
        newValue.splice(index, 1);
        setSelects(newValue);
        if (index > 0)
            setIndex(index - 1);
    }

    function onRawQueryChanged(event: React.SyntheticEvent, query: syphonx.SelectQuery) {
        const newValue = clone(selects);
        newValue[index] = query;
        setSelects(newValue);
    }

    function onSelectorChanged(event: Event | React.SyntheticEvent, value: string) {
        const newValue = clone(selects);
        newValue[index][0] = value;
        setSelects(newValue);
    }

    function onCommit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChange(event, selects);
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
                    <QueryPager
                        selects={selects}
                        index={index}
                        onChange={(event, index) => setIndex(index)}
                        onAdd={onAddQuery}
                        onDelete={onDeleteQuery}
                    />
                </Box>

                <Divider sx={{ mt: 1, mb: 2 }} />
                <SelectorEditor value={selects[index][0]} onChange={(event, value) => onSelectorChanged(event, value)} />
                <FunctionEditor sx={{ mt: 1 }} />
            </DialogContent>

            <DialogActions>
                <Tooltip title="Edit the raw jQuery code, or copy/paste a jQuery expression here">
                    <RawQueryEditor query={selects[index]} onChange={onRawQueryChanged} />
                </Tooltip>
                <Stack direction="row" spacing={0} justifyContent="end">
                    <Button variant="outlined" onClick={event => onClose(event)}>Cancel</Button>
                    <Button variant="contained" sx={{ ml: 1 }} onClick={onCommit}>OK</Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};