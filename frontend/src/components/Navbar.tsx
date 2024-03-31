export default function Navbar() {
    function changeLang() {
        console.log("language change")
        // 
    }

    return (
        <nav className="text-black pb-2 flex justify-between items-center shadow-md">
            <div className="flex items-center flex-1">
                <div className="square-black border-black border-[2px] rounded border"><img src="./logo.png" alt="Logo"></img></div>
                <span className="font-bold text-4xl ml-2 font-ptserif">Welcome to Rev's Grill</span>
            </div>
            <div className="flex items-center justify-end flex-2">
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">
                    <a href="/menu" className="hover:text-white">view menu</a>
                </button>
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">
                    <a href="/order" className="hover:text-white">start order</a>
                </button>
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">
                    <a href="/login" className="hover:text-white">login</a>
                </button>
                <button onClick={changeLang} className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">EN</button>
                <button className="border-[1px] border-black bg-white hover:bg-black hover:text-white px-4 py-2 ml-2 rounded-md text-lg font-medium font-ptserif">+</button>
            </div>
        </nav>
    )
}
