import { expect } from "chai";
import { slice } from "./slice.js";

describe("slice", () => {
    it("/", () => expect(slice("/")).to.eql(["/"]));
    it("/foo/", () => expect(slice("/foo/")).to.eql(["/", "/foo/"]));
    it("/foo/bar/", () => expect(slice("/foo/bar/")).to.eql(["/", "/foo/", "/foo/bar/"]));
    it("/foo/bar/baz/", () => expect(slice("/foo/bar/baz/")).to.eql(["/", "/foo/", "/foo/bar/", "/foo/bar/baz/"]));
});