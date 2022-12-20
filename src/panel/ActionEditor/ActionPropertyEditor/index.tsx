import React from "react";
import DebugView from "./DebugView";
import SelectEditor from "./SelectEditor";
import { useTemplate } from '../../context';
import { TemplateItem } from "../../../lib";

export interface Props {
    item?: TemplateItem;
}

export default ({ item }: Props) => {
    const { advanced } = useTemplate();

    if (item?.type === "select")
        return <SelectEditor item={item} />;
    else if (advanced)
        return <DebugView item={item} />;
    else
        return null;
};