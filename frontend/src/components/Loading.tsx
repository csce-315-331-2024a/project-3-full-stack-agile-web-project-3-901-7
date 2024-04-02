import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center gap-x-4 text-3xl font-bold font-inter">
            <CgSpinner className="animate-spin"/>
            <p>Loading...</p>
        </div>
    )
}