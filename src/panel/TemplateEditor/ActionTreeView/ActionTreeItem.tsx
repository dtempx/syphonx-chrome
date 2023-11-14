import React from "react";
import { TreeItem } from "@mui/lab";
import { useApp, useTemplate } from "../context";
import { hiliteItem, Template, TemplateItem } from "../lib";
import ActionTreeItemLabel from "./ActionTreeItemLabel";

export interface Props {
    item: TemplateItem;
}

export default function ActionTreeItem({ item }: Props) {
    const { editTracking } = useApp();
    const { template: json } = useTemplate();
    const template = new Template(json);

    return (
        <TreeItem
            nodeId={item.key}
            label={<ActionTreeItemLabel item={item} />}
            onMouseOver={() => {
                if (editTracking)
                    hiliteItem(item);
            }}
        >
            {item.children?.map(subitem => (<ActionTreeItem item={subitem} />))}
        </TreeItem>
    );
};