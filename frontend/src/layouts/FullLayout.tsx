interface FullLayoutProps {
    children?: React.ReactNode;
}

export default function FullLayout({children} : FullLayoutProps) {
    return (
        <div className="w-screen h-screen overflow-x-hidden p-8 relative bg-white dark:bg-black border-black dark:border-white text-black dark:text-white">
            {(children) ? children : <></>}
        </div>
    )
}