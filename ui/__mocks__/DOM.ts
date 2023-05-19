import { JSDOM } from "jsdom";
import DOMParser from "dom-parser";
const dom = new JSDOM();
globalThis.document = dom.window.document;
globalThis.window = dom.window as any;
globalThis.DOMParser = DOMParser as any;
