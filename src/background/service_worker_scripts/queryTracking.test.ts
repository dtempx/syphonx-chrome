import { expect } from "chai";
import { jsdomFromFile, findFlaggedElements } from "./lib";
import { queryTracking } from "./queryTracking";

function jsdomFromTestFile(file: string, className: string): void {
    jsdomFromFile(new URL("./queryTracking/" + file, import.meta.url));
    const elements = findFlaggedElements();
    elements.forEach(element => element.classList.add(className));
}

describe("queryTracking", () => {    

    it("example1", () => {
        jsdomFromTestFile("example1.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).eql(["h1"]);
    });

    it("example2", () => {
        jsdomFromTestFile("example2.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).eql(["div > p:first-of-type"]);
    });

    it("example3", () => {
        jsdomFromTestFile("example3.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).eql(["div > p:nth-of-type(2)"]);
    });

    it("target1", () => {
        jsdomFromTestFile("target1.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).to.include.members(["h1", "[data-test='product-title']"]);
    });

    it("bestbuy1", () => {
        jsdomFromTestFile("bestbuy1.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).to.include.members([".add-to-cart-button"]);
    });

    it("cvs1", () => {
        jsdomFromTestFile("cvs1.html", "sx-click");
        const result = queryTracking("sx-click");
        expect(result).to.include.members([".pdpPrice"]);
    });
});
