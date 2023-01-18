import React from "react";
import { LightbulbOutlined as TrackOffIcon } from "@mui/icons-material";

export default () => (
    <div>
        <p>
            Click the <TrackOffIcon fontSize="small" /> button above to start tracking with the mouse and then click anywhere on the page to automatically generate a CSS selector.
            You can left click, or use the middle mouse button to avoid triggering anything on the page.
        </p>
        <p>
            Or simply type a selector in the box above and the matched content will highlight on the page as you type.
        </p>
        <p>
            You can also enter a jQuery expression in the box at the bottom, or copy and paste.
            Almost any jQuery selector works out of the box in SyphonX!
        </p>
        <ul>
            <li>View the <a href="https://www.w3schools.com/cssref/css_selectors.php" target="_blank">CSS Selector Quick Reference</a>.</li>
            <li>Learn about writing <a href="https://www.elated.com/jquery-selectors/" target="_blank">jQuery selectors</a>, which is a superset of CSS Selectors.</li>
            <li>Learn about more advanced jQuery&nbsp;
                <a href="https://api.jquery.com/category/selectors/" target="_blank">selectors</a>,&nbsp;
                <a href="https://api.jquery.com/category/traversing/" target="_blank">tree traverals</a>, and&nbsp;
                <a href="https://api.jquery.com/category/manipulation/" target="_blank">page manipulation</a>.
            </li>
        </ul>
    </div>
);