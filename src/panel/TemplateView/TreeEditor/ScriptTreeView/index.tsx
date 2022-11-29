import React from "react";
import { Button, Grid, Toolbar } from "@mui/material";
import { useTemplate } from '../../../TemplateContext';
import { SelectAction } from "syphonx-core";
import ScriptTreeView from "./ScriptTreeView";

export default () => {
    const { template, selected, setSelected, updateTemplate } = useTemplate();
    const select = (template?.actions.find(action => !!(action as SelectAction).select) as SelectAction)?.select || [];

    function onAddButton() {
        const name = "unnamed1";
        select.push({ name });
        setSelected(name);
        updateTemplate();
    }

    function onRemoveButton() {
        const i = select.findIndex(obj => obj.name === selected);
        if (i >= 0) {
            select.splice(i, 1);
            setSelected(select[0]?.name || "");
        }
        updateTemplate();
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <ScriptTreeView />
            </Grid>
            <Grid item xs={12}>
                <Toolbar>
                    <Button variant="contained" size="small" color="primary" onClick={onAddButton}>Add</Button>
                    <Button variant="contained" size="small" color="primary" style={{ marginLeft: 8 }} onClick={onRemoveButton}>Remove</Button>
                </Toolbar>
            </Grid>
        </Grid>
    );
}