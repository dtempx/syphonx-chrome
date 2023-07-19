import React from "react";
import { StringListEditor } from ".";

import {
    Stack,
    Switch,
    SxProps,
    Theme
} from "@mui/material";

export interface Props {
    list: string[] | undefined;
    onChange: (event: React.SyntheticEvent, list: string[] | undefined) => void;
    sx?: SxProps<Theme>;
}

export default ({ list, onChange, sx }: Props) => (
    <Stack direction="column" sx={sx}>
        <Switch
            size="small"
            checked={!!list}
            onChange={(event, checked) => {
                onChange(event, checked ? [] : undefined);
            }}
        />
        {!!list &&
            <StringListEditor
                list={list}
                onChange={onChange}
                sx={{ mt: 1, mb: 1 }}
            />
        }
    </Stack>
);
