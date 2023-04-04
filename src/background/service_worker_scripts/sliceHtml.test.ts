import { expect } from "chai";
import { jsdomFromUrl } from "./lib";
import { sliceHtml } from "./sliceHtml";

describe("sliceHtml", () => {
    it("target", async () => {
        await jsdomFromUrl("https://www.target.com/p/tide-original-liquid-laundry-detergent-92-fl-oz/-/A-13918059");
        document.querySelector("h1")?.classList.add("sx-click");
        const slice = sliceHtml({ selector: ".sx-click", up: 3, down: 3 });
        const lines = slice.split("\n");
        const i = lines.findIndex(line => line === "<!---->");
        expect(lines[i + 1]).to.include(`data-test="product-title"`);
    });
});
