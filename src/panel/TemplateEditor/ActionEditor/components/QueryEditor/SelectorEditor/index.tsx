import React, { useMemo } from "react";
import * as syphonx from "syphonx-lib";
import { clone } from "../lib";
import FunctionEditor from "../FunctionEditor/index";
import SelectorField from "../SelectorField";

import {
    Box,
    SxProps,
    Theme
} from "@mui/material";

export interface Props {
    value: syphonx.SelectQuery;
    onChange: (event: React.SyntheticEvent, value: syphonx.SelectQuery) => void;
    context?: string;
    sx?: SxProps<Theme>;
}

export default ({ value, onChange, context, sx }: Props) => {
    const select = useMemo(() => value || [""], [value]);

    function onChangeSelector(event: Event | React.SyntheticEvent, value: string) {
        const obj = clone(select);
        obj[0] = value;
        onChange(event as React.SyntheticEvent, obj);
    }

    function onChangeQueryOp(event: Event | React.SyntheticEvent, value: syphonx.SelectQueryOp, i: number) {
        const obj = clone(select);
        obj[i] = value;
        onChange(event as React.SyntheticEvent, obj);
    }

    function onDeleteQueryOp(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) {
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
                            value={obj as syphonx.SelectQueryOp}
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