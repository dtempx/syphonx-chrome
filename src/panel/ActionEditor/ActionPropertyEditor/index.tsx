import React from "react";
import DebugView from "./DebugView";
import SelectEditor from "./SelectEditor";
import { TemplateItem } from "../../TemplateContext";

export interface Props {
    item?: TemplateItem;
}

export default ({ item }: Props) => {
    if (item?.type === "select")
        return <SelectEditor item={item} />;
    else
        return <DebugView item={item} />
};