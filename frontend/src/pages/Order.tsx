import { FaArrowRight } from "react-icons/fa"

export default function Order() {

    function callHelp() {
        console.log("fk u")
    }

    return (
        <div className="w-full h-full p-8 relative">
            
            <div className="flex flex-wrap gap-x-6 mt-14">
                <OrderCategoryCard/>
                <OrderCategoryCard/>
                <OrderCategoryCard/>
                <button type="button" onClick={callHelp} className="px-4 py-3 rounded-md bg-[#FF4545] text-white font-bold font-inter hover:shadow-[inset_120px_0_0_0_rgba(255,255,255,1)] duration-500 border-2 border-[#FF4545] hover:text-[#FF4545]">
                        Call Help
                </button>
            </div>

            <div className="flex justify-between mt-9 w-full h-full">
                <div className="mt-9">
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                    <OrderReceipt/>
                </div>
            </div>


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
        <div className="p-4 border-2 border-black rounded-md flex flex-col items-center gap-y-6">

            <h1 className="text-3xl font-bold font-ptserif">My <em>Order</em></h1>

            <div className="w-full flex flex-col gap-y-4">
                <OrderReceiptItem/>
                <OrderReceiptItem/>
                <OrderReceiptItem/>
            </div>

            <div className="w-full flex flex-col font-ptserif text-base">

                <div className="w-full px-4 py-2 flex justify-between items-center">
                    <p className="text-black/60">Total</p>
                    <p className="text-black">$69.69</p>
                </div>

                <div className="w-full px-4 py-2 flex justify-between items-center bg-black text-white rounded-md cursor-pointer duration-500 hover:bg-green-700">
                    <button type="button" onClick={() => alert("check out")}>Checkout</button>
                    <FaArrowRight/>
                </div>


            </div>

        </div>
    )
}

function OrderReceiptItem() {
    return (
        <div className="w-[360px] h-24 flex gap-x-4 bg-black">

        </div>
    )
}