import React from "react";
import { CssBaseline } from "@material-ui/core";
import Accordian from "./Accordian";
import { AppProvider } from "./AppContext";

export default () => (
<>
    <CssBaseline />
    <AppProvider>
        <Accordian />
    </AppProvider>
</>);
