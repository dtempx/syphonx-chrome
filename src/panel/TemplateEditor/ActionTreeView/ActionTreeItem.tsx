import React from "react";
import { TreeItem } from "@mui/lab";
import { TemplateItem } from "../lib";
import ActionTreeItemLabel from "./ActionTreeItemLabel";

export interface Props {
    item: TemplateItem;
}

export default function ActionTreeItem({ item }: Props) {
    return (
        <TreeItem
            nodeId={item.key}
            label={<ActionTreeItemLabel item={item} />}
        >
            {item.children?.map(subitem => (<ActionTreeItem item={subitem} />))}
        </TreeItem>
    );
};