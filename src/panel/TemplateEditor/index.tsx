import React from "react";
import { Box, Paper } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./components";
import { useApp, useTemplate, useTemplateData, ContractProvider, TemplateProvider, TemplateDataProvider } from "./context";
import AppBar from "./AppBar";
import AppFrame from "./AppFrame";
import CodeEditor from "./CodeEditor";
import DataPanel from "./DataPanel";
import TemplateSettings from "./TemplateSettings";
import TestRunner from "./TestRunner";
import VisualEditor from "./VisualEditor";

export default () => {
    const { mode } = useApp();
    const { setTemplate } = useTemplate();
    const { setExtract } = useTemplateData();
    return (
        <ErrorBoundary
            FallbackComponent={ErrorPage}
            onReset={() => {
                setTemplate("");
                setExtract(undefined);
            }}
        >
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
        </ErrorBoundary>
    );
};