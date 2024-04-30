import { twMerge } from "tailwind-merge";

interface PageLayoutProps {
    children?: React.ReactNode;
    className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
    return (
        <div
            className={twMerge("w-full h-full p-8 relative bg-white dark:bg-black border-black dark:border-white text-black dark:text-white", (className) ? className : "")}
        >
            {(children) ? children : <></>}
        </div>
    )
}