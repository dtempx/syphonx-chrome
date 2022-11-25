import React from "react";
import { Button, Grid, Toolbar } from "@material-ui/core";
import { useScript } from '../../../ScriptContext';
import { SelectAction } from "syphonx-core";
import ScriptTreeView from "./ScriptTreeView";

export default () => {
    const { script, selected, setSelected, updateScript } = useScript();
    const select = (script?.actions.find(action => !!(action as SelectAction).select) as SelectAction)?.select || [];

    function onAddButton() {
        const name = "unnamed1";
        select.push({ name });
        setSelected(name);
        updateScript();
    }

    function onRemoveButton() {
        const i = select.findIndex(obj => obj.name === selected);
        if (i >= 0) {
            select.splice(i, 1);
            setSelected(select[0]?.name || "");
        }
        updateScript();
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