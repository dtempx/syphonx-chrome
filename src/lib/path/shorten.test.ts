import { expect } from "chai";
import { shorten } from './shorten';

describe("shorten", () => {
    it("should return the input path if the length is less than the maximum", () => {
        const path = "/very/long/path/to/file.txt";
        const shortenedPath = shorten(path, path.length);
        expect(shortenedPath).equals(path);
    });

    it("should shorten the path in the middle", () => {
        const path = "/very/long/path/to/file.txt";
        const shortenedPath = shorten(path, 20);
        expect(shortenedPath).equals("/very/…/to/file.txt");
    });

    it("should shorten more of the path in the middle", () => {
        const path = "/very/long/path/to/file.txt";
        const shortenedPath = shorten(path, 18);
        expect(shortenedPath).equals("/very/…/file.txt");
    });

    it("should shorten the path to just the filename", () => {
        const path = "/very/long/path/to/file.txt";
        const shortenedPath = shorten(path, 15);
        expect(shortenedPath).equals("file.txt");
    });

    it("should shorten the path to just the filename exact", () => {
        const path = "/very/long/path/to/file.txt";
        const shortenedPath = shorten(path, 8);
        expect(shortenedPath).equals("file.txt");
    });

    it("should handle case where filename is less than the max length", () => {
        const path = "/file.txt";
        const shortenedPath = shorten(path, 5);
        expect(shortenedPath).equals("file…");
    });
});