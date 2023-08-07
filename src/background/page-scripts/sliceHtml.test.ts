import { expect } from "chai";
import { jsdomFromUrl } from "./lib";
import { sliceHtml } from "./sliceHtml";

describe("sliceHtml", () => {
    it("target", async () => {
        await jsdomFromUrl("https://www.target.com/p/tide-original-liquid-laundry-detergent-92-fl-oz/-/A-13918059");
        document.querySelector("h1")?.classList.add("sx-click");
        const { html, targets } = sliceHtml({ selector: ".sx-click", up: 3, down: 3 });
        expect(html).to.contain("<h1 ");
        expect(targets).to.be.an("array").lengthOf(1);
    });
});
