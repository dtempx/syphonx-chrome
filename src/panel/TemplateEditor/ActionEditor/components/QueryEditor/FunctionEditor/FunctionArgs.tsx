import React from "react";
import { SelectQueryOp } from "syphonx-lib";
import { useApp } from "../context";

import {
    Chip,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";

import functionDefs from "./functions.json";

export interface Props {
    query?: SelectQueryOp;
    onChange: (event: React.SyntheticEvent, value: SelectQueryOp) => void;
}

interface FunctionDef {
    key: string;
    advanced: boolean;
    help: string;
    args: FunctionDefArg[];
}

interface FunctionDefArg {
    name: string;
    type: string;
    help: string;
    required?: boolean;
    advanced?: boolean;
    mutate?:boolean;
}

const defaultFunctionDefs = [{ name: "Value", type: "string", help: "", required: true, advanced: false }];

export default ({ query = [""], onChange }: Props) => {
    const { advanced } = useApp();
    const functionDef = functionDefs.find(({ key }) => key === query[0]);
    const args: FunctionDefArg[] = functionDef ? functionDef.args || defaultFunctionDefs : [];

    function assignValue(newValue: unknown, i: number): SelectQueryOp {
        const obj = query.slice(0) as SelectQueryOp;
        obj[i] = newValue;
        return obj;
    }

    return (
        <>
            {
                args
                .filter(obj => advanced || !obj.advanced) // filter out advanced args
                .map(({ name, help, required }, index) => (
                    <Tooltip
                        arrow
                        placement="bottom"
                        title={
                            <>
                                <Typography variant="caption">{help}</Typography>
                                <Chip
                                    variant="filled"
                                    color="secondary"
                                    size="small"
                                    label={required ? "required" : "optional"}
                                    sx={{ ml: 1 }}
                                />
                            </>
                        }
                    >
                        <TextField
                            label={required ? `${name} *` : name}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={query[index + 1]}
                            onChange={event => onChange(event, assignValue(event.target.value, index + 1))}
                            sx={{
                                ml: 1,
                                visibility: query[0] ? "visible" : "hidden"
                            }}
                        />
                    </Tooltip>
                ))
            }
        </>
    );
}