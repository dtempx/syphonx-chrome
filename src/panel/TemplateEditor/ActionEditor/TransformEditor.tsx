import React from "react";
import { TemplateItem } from "../lib";
import * as syphonx from "syphonx-lib";

import {
    ComplexPropertyGrid,
    FormulaField,
    SingleQueryEditorField
} from "./components";

export interface Props {
    item: TemplateItem;
    onChange: (event: React.SyntheticEvent<Element, Event>) => void;
}

export default ({ item, onChange }: Props) => {
    const obj = item?.obj as syphonx.Transform;
    return obj ? (
        <ComplexPropertyGrid
            items={[
                [
                    "query",
                    <SingleQueryEditorField
                        name="transform"
                        query={obj.query}
                        onChange={(event, value) => {
                            obj.query = value;
                            onChange(event);
                        }}
                    />,
                    "A CSS selector or jQuery expression that defines the transform.",
                    true
                ],
                [
                    "when",
                    <FormulaField
                        value={obj.when}
                        onChange={(event, value) => {
                            obj.when = value || undefined;
                            onChange(event);
                        }}
                    />,
                    "A formula that determines whether the transform is evaluated.",
                    obj.when !== undefined
                ],
                /*
                [
                    "active",
                    <Switch
                        size="small"
                        checked={obj.active ?? true}
                        onChange={(event, value) => {
                            obj.active = value;
                            onChange(event);
                        }}
                    />,
                    "Determines whether the transform is active or bypassed.",
                    obj.active !== undefined
                ]
                */
            ]}
        />
    ) : null;
};