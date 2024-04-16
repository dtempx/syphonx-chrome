import React from "react";
import { formatDate } from "date-fns";

import {
    Typography,
    TypographyProps
} from "@mui/material";

export interface Props extends TypographyProps {
    date?: Date;
    format?: string;
}

export default ({ date = new Date(), format = "Pp", ...props }: Props) => (
    <Typography {...props}>{formatDate(date, format)}</Typography>
);
