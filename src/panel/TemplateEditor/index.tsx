import React from "react";
import { Box, Paper } from "@mui/material";
import { useApp, ContractProvider, TemplateProvider, TemplateDataProvider } from "./context";
import AppBar from "./AppBar";
import AppFrame from "./AppFrame";
import CodeEditor from "./CodeEditor";
import DataPanel from "./DataPanel";
import TemplateSettings from "./TemplateSettings";
import TestRunner from "./TestRunner";
import VisualEditor from "./VisualEditor";

export default () => {
    const { mode } = useApp();
    return (
        <ContractProvider>
            <TemplateProvider>
                <TemplateDataProvider>
                    <Box sx={{ minWidth: 500 }}>
                        <AppBar />
                        <AppFrame>
                            <>
                                {mode === "visual-editor" && <VisualEditor />}
                                {mode === "code-editor" && <CodeEditor />}
                                {mode === "test-runner" && <TestRunner />}
                                {mode === "template-settings" && <TemplateSettings />}
                                <Paper elevation={3} className="panel" sx={{ width: 1, height: 250 }}>
                                    <DataPanel />
                                </Paper>
                            </>
                        </AppFrame>
                    </Box>
                </TemplateDataProvider>
            </TemplateProvider>
        </ContractProvider>
    );
};