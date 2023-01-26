import React from "react";
import { Breadcrumbs, Link, SxProps, Theme, Typography } from "@mui/material";
import { Cloud as RootIcon } from "@mui/icons-material";
import * as path from "../lib/path";

export interface Props {
    file: string;
    onClick: (event: React.SyntheticEvent, key: string) => void;
    sx?: SxProps<Theme>;
}

export default ({ file, onClick, sx }: Props) => {
    const slices = path.slice(file);
    return (
        <Breadcrumbs sx={sx}>
            {slices.slice(0, -1).map(key =>
                <Link
                    underline="hover"
                    color="text.primary"
                    onClick={event => onClick(event, key)}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                >
                    {key !== "/" ? path.filename(key) : <RootIcon />}
                </Link>
            )}
            <Typography>
                {slices.length > 1 ? path.filename(slices.at(-1)!) : <RootIcon />}
            </Typography>
        </Breadcrumbs>
    );
};