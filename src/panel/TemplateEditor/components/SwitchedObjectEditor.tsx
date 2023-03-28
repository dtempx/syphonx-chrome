import React from "react";
import { ObjectEditor } from ".";

import {
    Stack,
    Switch,
    SxProps,
    Theme
} from "@mui/material";

export interface Props {
    obj: Record<string, any> | undefined;
    onChange: (event: React.SyntheticEvent, obj: Record<string, any> | undefined) => void;
    sx?: SxProps<Theme>;
}

export default ({ obj, onChange, sx }: Props) => (
    <Stack direction="column" sx={sx}>
        <Switch
            size="small"
            checked={!!obj}
            onChange={(event, checked) => {
                onChange(event, checked ? {} : undefined);
            }}
        />
        {!!obj &&
            <ObjectEditor
                obj={obj}
                onChange={onChange}
                sx={{ mt: 1, mb: 1 }}
            />
        }
    </Stack>
);
