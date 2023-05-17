import { JSDOM } from "jsdom";
const dom = new JSDOM();
globalThis.document = dom.window.document;
globalThis.window = dom.window as any;
