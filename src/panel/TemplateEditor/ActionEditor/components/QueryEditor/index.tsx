import React, { useEffect, useState } from "react";
import * as syphonx from "syphonx-lib";
import { TitleBar, TransitionUp } from "../../components";
import { clone } from "./lib";
import ActionIcon from "../../../ActionIcon";
import RawQueryEditor from "./RawQueryEditor";
import SelectorEditor from "./SelectorEditor/index";
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
    value: syphonx.SelectQuery[] | undefined;
    open: boolean;
    name?: string;
    type?: syphonx.SelectType;
    repeated?: boolean;
    single?: boolean;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectQuery[]) => void;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ value, open, name, type, repeated, single, onClose, onChange }: Props) => {
    const [select, setSelect] = useState<syphonx.SelectQuery[]>([[""]]);
    const [index, setIndex] = useState(0);

    useEffect(() =>
        setSelect(value || [[""]]),
    [value]);

    function onAddQuery() {
        const obj = clone(select);
        obj.push([""]);
        setSelect(obj);
        setIndex(obj.length - 1);
    }

    function onDeleteQuery() {
        const obj = clone(select);
        obj.splice(index, 1);
        setSelect(obj);
        if (index > 0)
            setIndex(index - 1);
    }

    function onChangeQuery(event: React.SyntheticEvent, query: syphonx.SelectQuery) {
        const obj = clone(select);
        obj[index] = query;
        setSelect(obj);
    }

    function onSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChange(event, select);
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
                    {!!name &&
                        <Stack direction="row">
                            {type && <ActionIcon name={type || "string"} sx={{ color: "primary.light", position: "relative", top: "4px" }} />}
                            <Typography variant="caption" fontSize="large" sx={{ ml: 1 }}>{name || "(array)"}</Typography>
                            {repeated ? <ActionIcon name="repeated" sx={{ color: "primary.light", ml: 1, position: "relative", top: "4px" }} /> : null}
                        </Stack>
                    }
                    {!single &&
                        <QueryPager
                            selects={select}
                            index={index}
                            onChange={(event, index) => setIndex(index)}
                            onAdd={onAddQuery}
                            onDelete={onDeleteQuery}
                        />
                    }
                </Box>

                <Divider sx={{ mt: 1, mb: 2 }} />
                <SelectorEditor
                    value={select[index]}
                    onChange={onChangeQuery}
                    context={name}
                />
            </DialogContent>

            <DialogActions>
                <Tooltip title="Edit the raw jQuery code, or copy/paste a jQuery expression here">
                    <RawQueryEditor query={select[index]} onChange={onChangeQuery} />
                </Tooltip>
                <Button variant="contained" sx={{ ml: 1 }} onClick={onSave}>OK</Button>
            </DialogActions>
        </Dialog>
    );
};