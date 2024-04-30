import { CgSpinner } from "react-icons/cg";
import FullLayout from "../layouts/FullLayout";

export default function Loading() {
    return (
        <FullLayout>
            <div className="w-full h-full flex justify-center items-center gap-x-4 text-3xl font-bold font-inter">
                <CgSpinner className="animate-spin"/>
                <p>Loading...</p>
            </div>
        </FullLayout>
    )
}