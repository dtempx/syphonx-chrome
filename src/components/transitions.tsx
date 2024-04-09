import React from "react";
import { Fade, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type R = React.Ref<unknown>;
type P = TransitionProps & { children: React.ReactElement; };

export const TransitionUp = React.forwardRef<R, P>((props, ref) => (<Slide direction="up" ref={ref} {...props} />));
export const FadeIn = React.forwardRef<R, P>((props, ref) => (<Fade in={true} ref={ref} {...props} />));
