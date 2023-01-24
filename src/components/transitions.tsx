import React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

type R = React.Ref<unknown>;
type P = TransitionProps & { children: React.ReactElement; };

export const TransitionUp = React.forwardRef<R, P>((props, ref) => (<Slide direction="up" ref={ref} {...props} />));