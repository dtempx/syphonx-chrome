import { expect } from "chai";
import { filename } from "./filename";

describe("filename", () => {
    it("/", () => expect(filename("/")).equals(""));
    it("/foo", () => expect(filename("/foo")).equals("foo"));
    it("/foo/", () => expect(filename("/foo/")).equals("foo"));
    it("/foo/bar", () => expect(filename("/foo/bar")).equals("bar"));
    it("/foo/bar/", () => expect(filename("/foo/bar/")).equals("bar"));
    it("/foo/bar.baz", () => expect(filename("/foo/bar.baz")).equals("bar.baz"));
    it("/foo/bar.baz/", () => expect(filename("/foo/bar.baz/")).equals("bar.baz"));
    it("(empty)", () => expect(filename("")).equals(""));
    it("(undefined)", () => expect(filename(undefined as unknown as string)).equals(""));
    it("(null)", () => expect(filename(null as unknown as string)).equals(""));
});
