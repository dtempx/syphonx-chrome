import React from "react";
import { CssBaseline } from "@material-ui/core";
import Accordian from "./Accordian";
import { AppProvider } from "./AppContext";
import { ScriptProvider } from "./ScriptContext";

export default () => (
<>
    <CssBaseline />
    <AppProvider>
        <ScriptProvider>
            <Accordian />
        </ScriptProvider>
    </AppProvider>
</>);
