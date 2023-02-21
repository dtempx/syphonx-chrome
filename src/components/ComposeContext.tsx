import React from "react";

export interface Props {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<unknown>>>
    children: React.ReactNode
}

export default ({ components = [], children }: Props) => (
    <>
        {components.reduceRight((acc, Comp) => {
            return <Comp>{acc}</Comp>
        }, children)}
    </>
);
