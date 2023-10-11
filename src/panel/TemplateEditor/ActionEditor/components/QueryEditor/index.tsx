import React, { useEffect, useState } from "react";
import { SelectQuery, SelectType } from "syphonx-lib";
import { clone } from "./lib";
import RawQueryEditor from "./RawQueryEditor";
import SelectorEditor from "./SelectorEditor/index";
import QueryPager from "./QueryPager";
import AIAssistant from "./AIAssistant";
import { useApp, useQueryBuilder } from "./context";

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

import {
    ActionIcon,
    SplitPane,
    TitleBar,
    TransitionUp
} from "./components";

export interface Props {
    query: SelectQuery[] | undefined;
    open: boolean;
    name?: string;
    type?: SelectType;
    repeated?: boolean;
    single?: boolean;
    onChange: (event: React.SyntheticEvent, query: SelectQuery[]) => void;
    onClose: (event: React.SyntheticEvent) => void;
}

export default ({ query: input, open, name, type, repeated, single, onClose, onChange }: Props) => {
    const { serviceUrl } = useApp();
    const { setActiveQuery } = useQueryBuilder();
    const [activeQueryIndex, setActiveQueryIndex] = useState(0);
    const [output, setOutput] = useState<SelectQuery[]>([[""]]);

    useEffect(() => {
        const obj = clone(input) || [[""]];
        setOutput(obj);
        setActiveQueryIndex(0);
        if (input)
            setActiveQuery(input[0]);
    }, [input]);

    function onAddQuery() {
        const obj = clone(output);
        obj.push([""]);
        setOutput(obj);
        const i = obj.length - 1;
        setActiveQueryIndex(i);
        setActiveQuery(obj[i]);
    }

    function onDeleteQuery() {
        const obj = clone(output);
        obj.splice(activeQueryIndex, 1);
        setOutput(obj);
        if (activeQueryIndex > 0) {
            const i = activeQueryIndex - 1;
            setActiveQueryIndex(i);
            setActiveQuery(obj[i]);
        }
    }

    function onChangeQuery(event: React.SyntheticEvent, query: SelectQuery) {
        const obj = clone(output);
        obj[activeQueryIndex] = query;
        setOutput(obj);
        setActiveQuery(query);
    }

    function onSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        onChange(event, output);
        onClose(event);
        setActiveQuery(undefined);
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
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Box sx={{ width: 1 }}>
                        <SplitPane
                            fullWidth
                            sx={{
                                bgcolor: "background.paper",
                                borderRadius: 1,
                                p: 1,
                                m: 1
                            }}
                        >
                            <Stack direction="row">
                                {name && <>
                                    {type && <ActionIcon name={type || "string"} sx={{ color: "primary.light", position: "relative", top: "4px" }} />}
                                    <Typography variant="caption" fontSize="large" sx={{ ml: 1 }}>{name || "(array)"}</Typography>
                                    {repeated ? <ActionIcon name="repeated" sx={{ color: "primary.light", ml: 1, position: "relative", top: "4px" }} /> : null}
                                </>}
                            </Stack>
                            {!single &&
                                <QueryPager
                                    query={output}
                                    index={activeQueryIndex}
                                    onChange={(event, index) => setActiveQueryIndex(index)}
                                    onAdd={onAddQuery}
                                    onDelete={onDeleteQuery}
                                />
                            }
                        </SplitPane>

                        <Divider sx={{ mt: 1, mb: 2 }} />
                        <SelectorEditor
                            query={output[activeQueryIndex]}
                            onChange={onChangeQuery}
                            context={name}
                        />

                    </Box>

                    {serviceUrl && (
                    <Box alignSelf="flex-end" sx={{ width: 1 }}>
                        <Divider sx={{ mt: 5 }} />
                        <AIAssistant
                            query={output[activeQueryIndex]}
                            type={type}
                            repeated={repeated}
                            name={name}
                            sx={{ mt: 2 }}
                        />
                    </Box>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Tooltip title="Edit the raw jQuery code, or copy/paste a jQuery expression here" placement="top-start">
                    <RawQueryEditor query={output[activeQueryIndex]} onChange={onChangeQuery} />
                </Tooltip>
                <Tooltip title="Closes the dialog and saves changes" placement="left">
                    <Button variant="contained" sx={{ ml: 1 }} onClick={onSave}>OK</Button>
                </Tooltip>
            </DialogActions>
        </Dialog>
    );
};