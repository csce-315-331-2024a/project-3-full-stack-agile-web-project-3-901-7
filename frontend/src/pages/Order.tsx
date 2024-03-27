export default function Order() {

    function callHelp() {
        console.log("fk u")
    }

    return (
        <div className="w-full h-full p-8 relative">
            
            <div className="flex flex-wrap gap-x-6">
                <OrderCategoryCard/>
                <OrderCategoryCard/>
                <OrderCategoryCard/>
            </div>

            <div className="flex justify-between">
                <div className="mt-9">
                </div>
                <OrderReceipt/>
            </div>

            <button type="button" onClick={callHelp} className="px-4 py-3 rounded-md bg-[#FF4545] absolute bottom-9 right-9 text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                Call Help
            </button>

        </div>
    )
}

function OrderCategoryCard() {
    return (
    <div className="w-[136px] h-[112px] bg-black">
    </div>
    )
}

function OrderReceipt() {
    return (
        <div className="p-4 border-2 border-black rounded-md flex flex-col items-center">

            <h1>My <em>Order</em></h1>

        </div>
    )
}