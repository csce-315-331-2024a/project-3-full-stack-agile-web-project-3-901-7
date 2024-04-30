import { twMerge } from "tailwind-merge";

interface PageLayoutProps {
    children?: React.ReactNode;
    className?: string;
}

/**
 * Renders a page layout component.
 * 
 * @param {PageLayoutProps} props - The props for the PageLayout component.
 * @returns {JSX.Element} The rendered PageLayout component.
 */
export default function PageLayout({ children, className }: PageLayoutProps) {
    return (
        <div
            className={twMerge("w-full h-full flex flex-col p-8 relative bg-white dark:bg-black border-black dark:border-white text-black dark:text-white", (className) ? className : "")}
        >
            {(children) ? children : <></>}
        </div>
    )
}