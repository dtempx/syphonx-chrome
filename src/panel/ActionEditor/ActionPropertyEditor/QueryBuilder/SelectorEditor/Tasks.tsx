import React from "react";

export default () => (
    <div>
        <details>
            <summary>Return an attribute value</summary>
            <ul>
                <li>Return the src attribute of an img tag</li>
                <li>Return the href attribute of an a tag</li>
                <li>Return the XYZ attribute</li>
            </ul>
        </details>

        <details>
            <summary>Extract text from the set of matched elements using a <a href="https://www.computerhope.com/jargon/r/regex.htm">Regular Expression</a></summary>
            <ul>
                <li>Extract text that starts with XYZ</li>
                <li>Extract text that ends with XYZ</li>
                <li>Extract text that contains XYZ</li>
            </ul>
        </details>

        <details>
            <summary>Search and replace</summary>
            <ul>
                <li>Replace the first occurance of ABC with DEF case sensitive|insensitive</li>
                <li>Replace all ABC with DEF</li>
                <li>Extract text that contains XYZ</li>
            </ul>
        </details>

        <details>
            <summary>Filter down the set of matched elements</summary>
            <ul>
                <li>Filter using a selector</li>
                <li>Filter elements that contain XYZ</li>
                <li>Filter elements that don't contain XYZ</li>
                <li>Filter using a regular expression</li>
            </ul>
        </details>

        <details>
            <summary>Other tasks</summary>
            <ul>
                <li>Return the inner|outer HTML of the matched elements instead of text</li>
                <li>Return the n-th element within the set of matched elements</li>
                <li>Navigate to the next|previous element relative to the matched element</li>
                <li>Navigate to the closest parent element that matches selector</li>
                <li>Map the set of matched elements using a formula</li>
            </ul>
        </details>

        <details>
            <summary>Tips &amp; tricks</summary>
            <ul>
                <li>Use :contains('XYZ') in a selector to match the text that the user sees on the page</li>
                <li>Use :has('XYZ') in a selector to match elements that have the specified sub-element</li>
                <li>Use :not(:has('XYZ')) in a selector to match elements that don't the specified sub-element</li>
                <li>Add :visible to a selector to narrow down to only elements that are actually visible on the page</li>
                <li>Google for "how to select XYZ using jQuery" and paste the solution in the box below</li>
            </ul>
        </details>

        <p>Switch to advanced mode</p>
    </div>
);