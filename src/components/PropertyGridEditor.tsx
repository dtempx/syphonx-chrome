import React from "react";

import {
    SxProps,
    Theme
} from "@mui/material";

import {
    DataGrid,
    GridColDef,
    GridValueGetterParams
} from "@mui/x-data-grid";

export type PropertyGridItem = [
    JSX.Element | string, // name
    JSX.Element | string | number | boolean // editor
];

export interface Props {
    columns?: Array<{ width: number | string }>,
    items: PropertyGridItem[];
    sx?: SxProps<Theme>;
}

export default ({ items, columns = [{ width: 100 }], sx }: Props) => (
    <DataGrid
        rows={rows}
        columns={columns}
        sx={sx}
    />
);