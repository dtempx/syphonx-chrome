import { expect } from "chai";
import { jsdom } from "./jsdom";
import { sliceHtml } from "./sliceHtml";

describe("sliceHtml", () => {
    before(() => jsdom(`
<html>
<body>
<div>
    <h1>Hello</h1>
    <ul>
    <li>abc</li>
    <li>def</li>
    </ul>
    <p>First</p>
</div>
<div>
    <p>Second</p>
</div>
<div>
    <div>
        <div>
            <p>Third</p>
        </div>
    </div>
</div>
<section>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</section>
<section title="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."></section>
</body>
</html>`
    ));

    it("test1", async () => {
        const { html, linenums } = sliceHtml({ selector: "h1", up: 1, down: 1 });
        expect(html).to.contain("> 0002 <h1>Hello</h1>");
        expect(linenums).eql([2]);
    });

    it("test2", async () => {
        const { html, linenums } = sliceHtml({ selector: "h1", up: 3 });
        expect(html).to.contain("> 0004 <h1>Hello</h1>");
        expect(linenums).eql([4]);
    });

    it("test3", async () => {
        const { html, linenums } = sliceHtml({ selector: "ul", up: 3 });
        expect(html).to.contain("> 0005 <ul>");
        expect(linenums).eql([5]);
    });

    it("test4", async () => {
        const { html, linenums } = sliceHtml({ selector: "li", up: 4 });
        expect(html).to.contain("> 0005 <li>abc</li>");
        expect(html).to.contain("> 0006 <li>def</li>");
        expect(linenums).eql([5, 6]);
    });

    it("test5", async () => {
        const { html, linenums } = sliceHtml({ selector: "p", up: 2 });
        expect(html).to.contain("> 0008 <p>First</p>");
        expect(html).to.contain("> 0011 <p>Second</p>");
        expect(html).to.contain("> 0015 <p>Third</p>");
        expect(linenums).eql([8, 11, 15]);
    });

    it("test6", async () => {
        const { html, linenums } = sliceHtml({ selector: "section" });
        expect(html).to.contain(`> 0020 <section>Lorem ipsum dolor … a commodo consequat.</section>`);
        expect(html).to.contain(`> 0021 <section title="Sed ut perspiciatis … icta sunt explicabo."></section>`);
        expect(linenums).eql([20, 21]);
    });
});
