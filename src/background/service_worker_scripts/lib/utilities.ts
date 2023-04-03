/**
 * Find elements that have been flagged by being preceded by an empty comment.
 * @returns A list of flagged elements.
 */
export function findFlaggedElements(): Element[] {
    const result: Element[] = [];
    const iterator = document.createNodeIterator(document.body, window.NodeFilter.SHOW_COMMENT | window.NodeFilter.SHOW_ELEMENT);
    let node = iterator.nextNode();
    while (node) {
        if (node.nodeType === window.Node.COMMENT_NODE) {
            const comment = node.textContent;
            // only consider comments that are empty, i.e. comments that look like this: <!---->
            if (comment === "") {
                while (node && node?.nodeType !== window.Node.ELEMENT_NODE)
                    node = iterator.nextNode();
                if (node)
                    result.push(node as Element);
            }
        }
        node = iterator.nextNode(); 
    }
    return result;
}
