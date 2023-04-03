import * as fs from "fs";
import * as playwright from "playwright";
import { JSDOM } from "jsdom";

export function jsdom(html: string): void {
    const jsdom = new JSDOM(html);
    const { window } = jsdom as unknown as Window & typeof globalThis;
    global.window = window;
    global.document = window.document;    
}

export function jsdomFromFile(file: string | URL): void {
    const html = fs.readFileSync(file, "utf-8");
    jsdom(html);
}

export async function jsdomFromUrl(url: string): Promise<void> {
    const browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
}