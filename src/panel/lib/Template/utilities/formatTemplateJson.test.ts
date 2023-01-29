import { expect } from "chai";
import { formatTemplateJson } from "./formatTemplateJson";

const emptyInput = `
{
  "query": [
    []
  ]
}
`.trim();

const emptyOutput = `
{
  "query": [[]]
}
`.trim();


const singleInput = `
{
  "query": [
    [
      "h1"
    ]
  ]
}
`.trim();

const singleOutput = `
{
  "query": [["h1"]]
}
`.trim();

const multiInput = `
{
  "query": [
    [
      "h1"
    ],
    [
      "img",
      [
        "attr",
        "href"
      ]
    ]
  ]
}
`.trim();

const multiOutput = `
{
  "query": [
    ["h1"],
    ["img",["attr","href"]]
  ]
}
`.trim();

describe("formatTemplateJson", () => {
  it("empty", () => expect(formatTemplateJson(emptyInput)).equals(emptyOutput));
  it("single", () => expect(formatTemplateJson(singleInput)).equals(singleOutput));
  it("multi", () => expect(formatTemplateJson(multiInput)).equals(multiOutput));
});