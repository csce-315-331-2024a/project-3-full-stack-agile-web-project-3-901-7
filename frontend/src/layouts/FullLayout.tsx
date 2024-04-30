/**
 * Props for the FullLayout component.
 */
interface FullLayoutProps {
    children?: React.ReactNode;
}

/**
 * A layout component that renders a full-screen layout with optional children.
 * @param children - The children to render within the layout.
 * @returns The rendered FullLayout component.
 */
export default function FullLayout({children} : FullLayoutProps) {
    return (
        <div className="w-screen h-screen overflow-x-hidden p-8 relative bg-white dark:bg-black border-black dark:border-white text-black dark:text-white">
            {(children) ? children : <></>}
        </div>
    )
}