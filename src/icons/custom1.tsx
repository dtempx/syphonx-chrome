import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export default (props: SvgIconProps) => (
    <SvgIcon fontSize="inherit" style={{ width: 24, height: 24 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);