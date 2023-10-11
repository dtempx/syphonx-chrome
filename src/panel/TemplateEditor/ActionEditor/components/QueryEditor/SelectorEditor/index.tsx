import React, { useMemo } from "react";
import { SelectQuery, SelectQueryOp } from "syphonx-lib";
import { clone } from "../lib";
import { useQueryBuilder } from "../context";

import FunctionEditor from "../FunctionEditor/index";
import SelectorField from "../SelectorField";

import {
    Box,
    SxProps,
    Theme
} from "@mui/material";

export interface Props {
    query: SelectQuery;
    onChange: (event: React.SyntheticEvent, value: SelectQuery) => void;
    context?: string;
    sx?: SxProps<Theme>;
}

export default ({ query, onChange, context, sx }: Props) => {
    const { activeQueryResult } = useQueryBuilder();
    const select = useMemo(() => query || [""], [query]);
    const output = useMemo(() => activeQueryResult.map(obj => ({ text: obj.text, html: obj.html })), [activeQueryResult]);

    function onChangeSelector(event: Event | React.SyntheticEvent, value: string) {
        const obj = clone(select);
        obj[0] = value;
        onChange(event as React.SyntheticEvent, obj);
    }

    function onChangeQueryOp(event: Event | React.SyntheticEvent, value: SelectQueryOp, i: number) {
        const obj = clone(select);
        obj[i] = value;
        onChange(event as React.SyntheticEvent, obj);
    }

    function onDeleteQueryOp(event: React.SyntheticEvent, i: number) {
        const obj = clone(select);
        obj.splice(i, 1);
        onChange(event, obj);
    }

    return (
        <Box sx={sx}>
            <SelectorField
                value={select[0]}
                onChange={(event, value) => onChangeSelector(event, value)}
                context={context}
            />

            {/* !select[0] && <Overview /> */}
            {/* select[0] && select.length === 1 && <Tasks /> */}
            {select[0] && (
                <Box>
                    {select.slice(1).map((obj, i) =>
                        <FunctionEditor
                            query={obj as SelectQueryOp}
                            output={output[i + 1]}
                            onChange={(event, obj) => onChangeQueryOp(event, obj, i + 1)}
                            onDelete={event => onDeleteQueryOp(event, i + 1)}
                            sx={{ mt: 1 }}
                        />
                    )}

                    <FunctionEditor
                        onChange={(event, obj) => onChangeQueryOp(event, obj, select.length)}
                        sx={{ mt: 1 }}
                    />
                </Box>
            )}
        </Box>
    );
};