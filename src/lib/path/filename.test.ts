import { expect } from "chai";
import { filename } from "./filename.js";

describe("filename", () => {
    it("/", () => expect(filename("/")).equals("/"));
    it("/foo/", () => expect(filename("/foo/")).equals("foo/"));
    it("/foo/bar/", () => expect(filename("/foo/bar/")).equals("bar/"));
    it("/foo/bar.baz", () => expect(filename("/foo/bar.baz")).equals("bar.baz"));
});