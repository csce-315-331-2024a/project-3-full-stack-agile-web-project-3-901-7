import { render } from "@testing-library/react"
import PageLayout from "../layouts/PageLayout"
import FullLayout from "../layouts/FullLayout"


describe("Testing Page Layout", () => {
    it("render without children", () => {
        render(<PageLayout />)
    })
    it("render with classname", () => {
        render(<PageLayout className="w-full"/>)
    })
    it("render with children", () => {
        render(<PageLayout><div>Test</div></PageLayout>)
    })
    it("render with children and classname", () => {
        render(<PageLayout className="w-full"><div>Test</div></PageLayout>)
    })
})

describe("Testing Full Layout", () => {
    it("render without children", () => {
        render(<FullLayout/>)
    })
    it("render with children", () => {
        render(<FullLayout><div>Test</div></FullLayout>)
    })
})