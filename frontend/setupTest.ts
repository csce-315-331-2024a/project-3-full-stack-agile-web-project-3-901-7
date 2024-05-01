import { expect, afterEach} from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers"
import "matchmedia-polyfill";
import "@testing-library/jest-dom";

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

if (matchers !== undefined) {
    expect.extend(matchers);
}

afterEach(() => {
    cleanup;
})