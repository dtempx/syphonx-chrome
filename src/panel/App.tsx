import React from "react";
import { CssBaseline } from "@material-ui/core";
import Accordian from "./Accordian";
import { AppProvider } from "./AppContext";
import { TemplateProvider } from "./TemplateContext";

export default () => (
<>
    <CssBaseline />
    <AppProvider>
        <TemplateProvider>
            <Accordian />
        </TemplateProvider>
    </AppProvider>
</>);
