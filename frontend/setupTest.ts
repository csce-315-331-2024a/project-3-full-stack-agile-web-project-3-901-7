import { expect, afterEach} from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers"

if (matchers !== undefined) {
    expect.extend(matchers);
}

afterEach(() => {
    cleanup;
})