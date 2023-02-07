import React from "react";
import { Box, Paper } from "@mui/material";
import { useApp, ContractProvider, TemplateProvider } from "./context";
import DataView from "./DataView";
import AppBar from "./AppBar";
import AppFrame from "./AppFrame";
import VisualEditorView from "./VisualEditorView";
import CodeEditorView from "./CodeEditorView";
import TestRunnerView from "./TestRunnerView";
import TemplateSettingsView from "./TemplateSettingsView";

export default () => {
    const { mode } = useApp();
    return (
        <ContractProvider>
            <TemplateProvider>
                <Box sx={{ minWidth: 500 }}>
                    <AppBar />
                    <AppFrame>
                        <>
                            {mode === "visual-editor" && <VisualEditorView />}
                            {mode === "code-editor" && <CodeEditorView />}
                            {mode === "test-runner" && <TestRunnerView />}
                            {mode === "template-settings" && <TemplateSettingsView />}
                            <Paper elevation={3} className="panel" sx={{ width: 1, height: 250 }}>
                                <DataView />
                            </Paper>
                        </>
                    </AppFrame>
                </Box>
            </TemplateProvider>
        </ContractProvider>
    );
};